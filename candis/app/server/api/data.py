# imports - standard imports
import os

# imports - third-party imports
from flask import request, jsonify
import addict

# imports - module imports
from candis.app.server.app      import app
from candis.config              import CONFIG
from candis.app.server.response import Response
from candis.data                import cdata
from candis.util                import assign_if_none, get_rand_uuid_str

# TODO: store in a JSON file
FILE_FORMATS = [
    { 'name': 'CEL',   'extensions': ['.cel', '.CEL'] },
    { 'name': 'CDATA', 'extensions': ['.cdata'] }
]

def get_file_format(file_):
    _, ext  = os.path.splitext(file_)
    format_ = None

    for metadata in FILE_FORMATS:
        for extension in metadata['extensions']:
            if ext == extension:
                format_ = metadata['name']

                break

    return format_

def discover_resource(path,
                      level   = None,
                      filter_ = None):
    tree      = addict.Dict()
    tree.path = path
    tree.dirs, tree.files = [ ], [ ]

    for file_ in os.listdir(path):
        relpath = os.path.join(path, file_)
        abspath = os.path.abspath(relpath)

        if os.path.isfile(abspath):
            if filter_:
                format_ = get_file_format(file_)

                if format_ in filter_:
                    size        = os.path.getsize(abspath)

                    wrap        = addict.Dict()
                    wrap.name   = file_
                    wrap.size   = size
                    wrap.format = format_

                    tree.files.append(wrap)

        if os.path.isdir(abspath):
            resource    = discover_resource(
                path    = relpath,
                level   = level,
                filter_ = filter_
            )

            wrap          = addict.Dict()
            wrap.resource = resource

            tree.dirs.append(wrap)

    return tree

@app.route(CONFIG.App.Routes.RESOURCE, methods = ['GET', 'POST'])
def resource(path   = None,
            level   = None, # provide an exhaustive search
            filter_ = ['CDATA', 'CEL']):
    response  = Response()

    startdir  = assign_if_none(path, CONFIG.App.STARTDIR)

    tree      = discover_resource(
      path    = startdir,
      level   = level,
      filter_ = filter_
    )

    response.set_data(tree)

    dict_     = response.to_dict()
    json_     = jsonify(dict_)
    code      = response.code

    return json_, code

@app.route(CONFIG.App.Routes.READ, methods = ['GET', 'POST'])
def read():
    response    = Response()

    parameters  = request.get_json()

    # TODO: check if valid parameters
    path, name  = parameters['path'], parameters['name']

    relpath     = os.path.join(path, name)
    format_     = get_file_format(name)

    if format_ == 'CDATA':
        dataset = cdata.read(relpath)

        response.set_data(dataset)

    dict_       = response.to_dict()
    json_       = jsonify(dict_)
    code        = response.code

    return json_, code

@app.route(CONFIG.App.Routes.WRITE, methods = ['POST'])
def write():
    response   = Response()

    parameters = request.get_json()

    cdata.write(parameters['name'] + '.cdata', parameters['buffer'])

    dict_      = response.to_dict()
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code
