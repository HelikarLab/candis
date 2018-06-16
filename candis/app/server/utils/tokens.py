from flask import request
import jwt
from functools import wraps
from candis.app.server.app import app
from candis.app.server.response import Response
from flask import jsonify

def generate_token(payload, secret_key):
    pass

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            jwt.decode(request.headers.get('token'), app.config['SECRET_KEY'])
            return f(*args, **kwargs)
        except Exception as e:
            response = Response()
            response.set_error(
                Response.Error.ACCESS_DENIED,
                "Please log in first."
            )
            dict_      = response.to_dict()
            json_      = jsonify(dict_)
            code       = response.code    
            return json_, code
    return wrap
