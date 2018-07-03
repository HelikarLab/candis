# imports - standard imports
import os
import time
import json

# imports - third-party imports
from flask import request, jsonify
import addict
import jwt

# imports - module imports
from candis.config              import CONFIG
from candis.util                import (
    assign_if_none, get_rand_uuid_str, get_timestamp_str, merge_dicts
)
from candis.resource            import R
from candis.ios                 import Pipeline
from candis.ios                 import json as JSON
from candis.app.server.app      import app
from candis.app.server.app      import socketio
from candis.app.server.utils.tokens import login_required
from candis.app.server.response import Response
from candis.app.server.utils.response import save_response_to_db
from candis.app.server.models.pipeline import PipelineRun, Pipeline as PipelineModel
from candis.app.server.models.user import User

# TODO: Create a default handler that accepts JSON serializable data.
# HINT: Can be written better?
@app.route(CONFIG.App.Routes.API.Pipeline.RUN, methods = ['POST'])
@login_required
def run(delay = 5):
    response         = Response()

    parameters       = addict.Dict(request.get_json())

    decoded_token = jwt.decode(request.headers.get('token'), app.config['SECRET_KEY'])
    username = decoded_token['username']
    user = User.get_user(username=username)

    stages = []
    for p in user.pipelines:
        if p.name == parameters.name:
            print("Found a match!!")
            stages = json.loads(p.stages)


    if parameters.path and parameters.name and parameters.format:
        relpath      = os.path.join(parameters.path, parameters.name)

        # TODO: Check if file exists, else respond error.
        if parameters.format == 'pipeline':
            try:
                cdat, pipe  = Pipeline.load(stages)
                print("Loaded correctly!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                pipe.run(cdat, verbose = CONFIG.DEBUG)

                while pipe.status == Pipeline.RUNNING:
                    status        = addict.Dict()
                    status.stages = pipe.stages
                    status.logs   = pipe.logs

                    socketio.emit('status', status)

                    time.sleep(delay)
                
                print("Type of gist is {}".format(type(pipe.gist)))
                for p in user.pipelines:
                    if p.name == parameters.name:
                        print("Found a match!!")
                        new_pipe_run = PipelineRun(gist=json.dumps(pipe.gist), pipeline=p)
                        new_pipe_run.add_pipeline_run()

                JSON.write(relpath, pipe.stages)

            except (IOError, ValueError) as e:
                response.set_error(Response.Error.UNPROCESSABLE_ENTITY, str(e))
        else:
            response.set_error(Response.Error.UNPROCESSABLE_ENTITY)
    else:
        response.set_error(Response.Error.UNPROCESSABLE_ENTITY)

    dict_       = response.to_dict()
    save_response_to_db(dict_)
    json_       = jsonify(dict_)
    code        = response.code

    return json_, code
