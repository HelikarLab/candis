# imports - standard imports
import os

# imports - third-party imports
from flask import request, jsonify

# imports - module imports
from candis.config              import CONFIG
from candis.resource            import R
from candis.ios                 import json as JSON
from candis.app.server.app      import app
from candis.app.server.response import Response

@app.route(CONFIG.App.Routes.API.Preprocess.METHODS, methods = ['GET'])
def pmethods():
    response  = Response()

    path      = os.path.join(R.Path.DATA, 'preprocess-methods.json')
    methods   = JSON.read(path)

    response.set_data(methods)

    dict_     = response.to_dict()
    json_     = jsonify(dict_)
    code      = response.code

    return json_, code
