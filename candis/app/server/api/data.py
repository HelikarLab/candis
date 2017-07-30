# imports - standard imports
import os

# imports - third-party imports
from flask import request, jsonify
import addict

# imports - module imports
from candis.config              import CONFIG
from candis.util                import (
    assign_if_none, get_rand_uuid_str, json_load, get_timestamp_str
)
from candis.resource            import R
from candis.ios                 import cdata, pipeline
from candis.app.server.app      import app
from candis.app.server.response import Response

FFORMATS         = json_load(os.path.join(R.Path.DATA, 'file-formats.json'))
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

@app.route(CONFIG.App.Routes.Api.Data.RESOURCE, methods = ['GET', 'POST'])
def resource(filter_ = ['cdata', 'csv', 'cel', 'pipeline'], level = None):
    response  = Response()

    startdir  = CONFIG.App.STARTDIR

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

@app.route(CONFIG.App.Routes.Api.Data.READ, methods = ['GET', 'POST'])
def read():
    response    = Response()

    parameters  = addict.Dict(request.get_json())

    if 'path' in parameters:
        if 'name' in parameters:
            path    = parameters.path
            name    = parameters.name

            relpath = os.path.join(path, name)

            # TODO: check if file exists, set error if not.

            format_ = get_file_format(name)

            if format_ == 'cdata':
                dataset = cdata.read(relpath)

                response.set_data(dataset)
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
@app.route(CONFIG.App.Routes.Api.Data.WRITE, methods = ['POST'])
def write(output = { 'name': '', 'path': '', 'format': None }, buffer_ = { }, handler = None):
    response     = Response()

    parameters   = addict.Dict(request.get_json())

    if 'output' in parameters:
        output   = addict.Dict({ **output, **parameters.output }) # merge dicts, Python 3.5+

    output.path  = os.path.join(ABSPATH_STARTDIR, output.path)
    output.name  = output.name.strip() # remove padding spaces

    if output.format:
        if   output.format == 'cdata':
             if output.name in ['', '.cdata', '.CDATA']: # no filename?
                name = get_timestamp_str('CDAT%Y%m%d%H%M%S.cdata')
             else:
                name = output.name

             output.name, handler = name, cdata
        elif output.format == 'pipeline':
             if output.name in ['', '.cpipe', '.CPIPE']:
                name = get_timestamp_str('PIPE%Y%m%d%H%M%S.cpipe')
             else:
                name = output.name

             output.name, handler = name, pipeline

    if 'buffer' in parameters:
        buffer_  = parameters.buffer

    fpath        = os.path.join(output.path, output.name)

    try:
        handler.write(fpath, buffer_)

        data         = addict.Dict()
        data.output  = output
        data.data    = handler.read(fpath)

        response.set_data(data)
    except TypeError as e:
        response.set_error(Response.Error.UNPROCESSABLE_ENTITY)

    dict_      = response.to_dict()
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code

@app.route('/api/run', methods = ['GET', 'POST'])
def run():
    response   = Response()

    parameters = addict.Dict(request.get_json())

    discover_path =  os.path.abspath(os.path.join(ABSPATH_STARTDIR, '../CancerDiscover'))
    scripts  = os.path.join(discover_path, 'Scripts')
    conf     = os.path.join(discover_path, 'Scripts', 'Configuration.txt')
    bgCorrrect = 'rma'
    normal     = 'quantiles'
    pmCorrect  = 'pmonly'

    if 'path' in parameters and 'name' in parameters:
        pipe   = pipeline.read(os.path.join(parameters.path, parameters.name))

        for i, stage in enumerate(pipe):
            if stage['status'] == 'RESOURCE_REQUIRED':
                response.set_error(Response.Error.UNPROCESSABLE_ENTITY)
                break
            elif stage['code'] == 'dat.fle':
                dataset = cdata.read(stage['value'])
                import pandas as pd
                df      = pd.DataFrame.from_records(dataset['data'])
                df.to_csv(os.path.join(discover_path, 'DataFiles', 'sampleList.txt'), mode = 'w', header = False, index = False)
                
                print('successfully wrote sampleList.txt')
                pipe[i]['status'] = 'FINISHED'

                pipeline.write(os.path.join(parameters.path, parameters.name), pipe)

            elif stage['code'] == 'prp.bgc.rma':
                bgCorrrect = 'rma'
            elif stage['code'] == 'prp.bgc.mas':
                bgCorrrect = 'mas'
            elif stage['code'] == 'prp.nrm.cst':
                normal = 'constant'
            elif stage['code'] == 'prp.nrm.crt':
                normal = 'contrast'
            elif stage['code'] == 'prp.pmc.mas':
                normal = 'mas'
            elif stage['code'] == 'prp.pmc.smm':
                normal = 'subtractmm'
    else:
        response.set_error(Response.Error.UNPROCESSABLE_ENTITY)



    # path     = os.path.abspath(os.path.join(ABSPATH_STARTDIR, '../CancerDiscover'))
    

    # pipefile = pipeline.read(os.path.join(parameters.path, parameters.name))

    # print(pipefile)

    # bgCorrrect ="rma"

    import subprocess
    print('copying files')
    subprocess.call(['cp', '-R', os.path.join(discover_path, 'SampleData/*'), os.path.join(discover_path, 'DataFiles')])

    print('adding configuration')

    configso = open(conf).read()
    print(configso)
    open(conf, "w").write("$pathToProject={}\n".format(discover_path) + configso)

    import subprocess
    subprocess.call(['bash', os.path.join(scripts, 'initialization.bash')])
    subprocess.call(['Rscript', os.path.join(scripts, 'normalization.R')])

    
    dict_      = response.to_dict()
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code
