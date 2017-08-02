# imports - standard imports
import os

# imports - third-party imports
from flask import request, jsonify

# imports - module imports
from candis.config              import CONFIG
from candis.util                import json_load
from candis.resource            import R
from candis.app.server.app      import app
from candis.app.server.response import Response

@app.route(CONFIG.App.Routes.API.Model.METHODS, methods = ['GET'])
def mmethods():
    response  = Response()

    path      = os.path.join(R.Path.DATA, 'learning-models.json')
    methods   = json_load(path)

    response.set_data(methods)

    dict_     = response.to_dict()
    json_     = jsonify(dict_)
    code      = response.code

    return json_, code
