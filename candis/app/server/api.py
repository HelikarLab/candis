# imports - standard imports
import os

# imports - third-party imports
from flask import jsonify

# imports - module imports
from candis.app.server.app      import app
from candis.config              import CONFIG
from candis.app.server.response import Response
from candis.util                import get_rand_uuid_str

@app.route(CONFIG.App.Routes.FILES, methods = ['GET', 'POST'])
def get_files(accepted_extensions = ['.cel', '.CEL']):
    response = Response()

    startdir = CONFIG.App.STARTDIR
    dirpath  = os.path.abspath(startdir)

    files    = list()

    for f in os.listdir(dirpath):
        path = os.path.join(dirpath, f)

        if os.path.isfile(path):
            name, ext = os.path.splitext(f)

            if ext in accepted_extensions:
                size  = os.path.getsize(path)

                files.append({
                      'id': get_rand_uuid_str(),
                    'name': name,
                    'size': size
                })

    response.set_data(files)

    dict_    = response.to_dict()
    json_    = jsonify(dict_)
    code     = response.code

    return json_, code
