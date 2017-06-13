# imports - standard imports
import os

# imports - third-party imports
from flask import jsonify

# imports - module imports
from candis.app.server.app      import app
from candis.config              import CONFIG
from candis.app.server.response import Response
from candis.data.reader         import read_cdata
from candis.util                import assign_if_none, get_rand_uuid_str

def discover_resource(id = None, dirpath = None,
                      accepted_file_extensions = ['.cdata'],
                      accepted_data_extensions = ['.cel', '.CEL']):
    startdir  = assign_if_none(dirpath, CONFIG.App.STARTDIR)
    dirpath   = os.path.abspath(startdir)

    cdatas    = [ ]
    data      = [ ]

    for root, dirs, files in os.walk(dirpath):
        for f in files:
            name, extension = os.path.splitext(f)
            path            = os.path.join(root, f)

            if extension in accepted_file_extensions:
                rid   = get_rand_uuid_str()
                cdata = read_cdata(path)
                cdatas.append({ 'id': rid, 'name': name, 'data': cdata })

            if extension in accepted_data_extensions:
                rid   = get_rand_uuid_str()
                size  = os.path.getsize(path)

                data.append({ 'id': rid, 'name': name, 'size': size })

    resources = { 'files': cdatas, 'data': data }

    return resources

@app.route(CONFIG.App.Routes.RESOURCE, methods = ['GET', 'POST'])
def resource(accepted_data_extensions = ['.cel', '.CEL']):
    response  = Response()

    resources = discover_resource(accepted_data_extensions = accepted_data_extensions)

    response.set_data(resources)

    dict_     = response.to_dict()
    json_     = jsonify(dict_)
    code      = response.code

    return json_, code
