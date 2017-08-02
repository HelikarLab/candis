# imports - standard imports
import os

# imports - third-party imports
from flask import request, jsonify
import addict

# imports - module imports
from candis.config              import CONFIG
from candis.util                import (
    assign_if_none, get_rand_uuid_str, get_timestamp_str, merge_dicts
)
from candis.resource            import R
from candis.ios                 import cdata, pipeline
from candis.ios                 import json as JSON
from candis.app.server.app      import app
from candis.app.server.response import Response

FFORMATS         = JSON.read(os.path.join(R.Path.DATA, 'file-formats.json'))
ABSPATH_STARTDIR = os.path.abspath(CONFIG.App.STARTDIR)

def get_filename_if_exists(filename, count = 1, format_ = ' ({count})'):
    name, extension   = os.path.splitext(filename)

    if os.path.exists(filename):
        format_       = '{name}{format_}{extension}'.format(
            name      = name,
            format_   = format_,
            extension = extension
        )

        while os.path.exists(format_.format(count = count)):
            count += 1

        filename   = format_.format(count = count)

    return filename

def get_file_format(file_):
    format_ = None

    if file_:
        _, ext = os.path.splitext(file_)

        for metadata in FFORMATS:
            for extension in metadata['extensions']:
                if ext == extension:
                    format_ = metadata['name']

                    break

    return format_

def discover_resource(path, level = None, filter_ = None):
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

@app.route(CONFIG.App.Routes.API.Data.RESOURCE, methods = ['GET', 'POST'])
def resource(filter_ = ['cdata', 'csv', 'cel', 'pipeline'], level = None):
    response   = Response()

    parameters = addict.Dict(request.get_json())
    
    path       = CONFIG.App.STARTDIR if 'path' not in parameters else os.path.join(CONFIG.App.STARTDIR, parameters.path)

    tree       = discover_resource(
      path     = path,
      level    = level,
      filter_  = filter_
    )

    response.set_data(tree)

    dict_      = response.to_dict()
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code

@app.route(CONFIG.App.Routes.API.Data.READ, methods = ['GET', 'POST'])
def read():
    response    = Response()

    parameters  = addict.Dict(request.get_json())

    if parameters.path and parameters.name and parameters.format:
        relpath = os.path.join(parameters.path, parameters.name)

        # TODO: Check if file exists, else respond error.

        if parameters.format == 'cdata':
            cdat  = cdata.read(relpath)
            dict_ = cdat.to_dict()

            response.set_data(dict_)
        else:
            response.set_error(Response.Error.UNPROCESSABLE_ENTITY)
    else:
        response.set_error(Response.Error.UNPROCESSABLE_ENTITY)

    dict_       = response.to_dict()
    json_       = jsonify(dict_)
    code        = response.code

    return json_, code

# TODO: Create a default handler that accepts JSON serializable data.
# HINT: Can be written better?
@app.route(CONFIG.App.Routes.API.Data.WRITE, methods = ['POST'])
def write(output = { 'name': '', 'path': '', 'format': None }):
    response     = Response()

    parameters   = addict.Dict(request.get_json())

    if parameters.output:
        output   = addict.Dict(merge_dicts(output, parameters.output))

    output.path  = os.path.join(ABSPATH_STARTDIR, output.path)
    output.name  = output.name.strip() # remove padding spaces

    buffer_      = parameters.buffer

    if output.format:
        if   output.format == 'cdata':
             if output.name in ['', '.cdata', '.CDATA']:
                name = get_timestamp_str('CDAT%Y%m%d%H%M%S.cdata')
             else:
                name = output.name

             output.name = name
        elif output.format == 'pipeline':
             if output.name in ['', '.cpipe', '.CPIPE']:
                name = get_timestamp_str('PIPE%Y%m%d%H%M%S.cpipe')
             else:
                name = output.name

             output.name = name

             if not buffer_:
                buffer_  = [ ]

    opath        = os.path.join(output.path, output.name)

    try:
        JSON.write(opath, buffer_)

        data         = addict.Dict()
        data.output  = output
        data.data    = JSON.read(opath)

        response.set_data(data)
    except TypeError as e:
        response.set_error(Response.Error.UNPROCESSABLE_ENTITY)

    dict_      = response.to_dict()
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code
