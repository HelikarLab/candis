from flask import request
import jwt
from functools import wraps
from candis.app.server.app import app, redis
from candis.app.server.response import Response
from flask import jsonify

def generate_token(payload, secret_key):
    pass

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            payload = jwt.decode(request.headers.get('token'), app.config['SECRET_KEY'])
            if redis.redis.hget('blacklist', payload['username']) == "True":
                response = Response()
                response.set_error(
                    Response.Error.ACCESS_DENIED,
                    "Session timed out. Login again."
                )
                
                dict_      = response.to_dict()
                json_      = jsonify(dict_)
                code       = response.code    
                
                return json_, code

            return f(*args, **kwargs)
        except Exception as e:
            print(e)
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

def logout_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            payload = jwt.decode(request.headers.get('token'), app.config['SECRET_KEY'])
            if redis.redis.hget('blacklist', payload['username']) == "False":
                
                response = Response()
                response.set_error(
                    Response.Error.ACCESS_DENIED,
                    "Already logged in"
                )
                dict_      = response.to_dict()
                json_      = jsonify(dict_)
                code       = response.code    
                
                return json_, code
            return f(*args, **kwargs)
        except Exception as e:
            return f(*args, **kwargs)
    return wrap

    