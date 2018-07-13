# imports - standard imports
import os
import gc
import json

# imports - third-party imports
from flask import request, jsonify
import jwt
import addict
from jwt.exceptions import ExpiredSignatureError, InvalidSignatureError

# imports - module imports
from candis.app.server.app import app, redis
from candis.app.server.models.user import User
from candis.config import CONFIG
from candis.app.server.response import Response
from candis.app.server.helpers.verify import verify_password
from candis.app.server.utils.tokens import login_required, logout_required
from candis.app.server.utils.response import save_response_to_db
from candis.app.server.helpers.fileData import modify_data_path

def generate_token(user_, key=app.config['SECRET_KEY'], exp=os.environ.get('EXPIRY_TIME')):
    payload = addict.Dict(username=user_.username)
    if exp:
        payload.update({'exp': exp})
    encoded_token = jwt.encode(payload=payload, key=key).decode('utf-8')
    return encoded_token

@app.route(CONFIG.App.Routes.API.User.SIGN_UP, methods=['POST'])
@logout_required
def sign_up():
    response = Response()
    form = addict.Dict(request.get_json())
    username, email, password = form['username'], form['email'], form['password']

    if User.get_user(username=username):
        response.set_error(
            Response.Error.UNPROCESSABLE_ENTITY,
            'User with username "{}" is already registered'.format(username)
        )
    elif User.get_user(email=email):
        response.set_error(
            Response.Error.UNPROCESSABLE_ENTITY,
            'User with email "{}" is already registered'.format(email)
        )
    else:
        new_user = User(username, email, password)
        new_user.add_user()

        encoded_token = generate_token(new_user)
        response.set_data({
            'token': encoded_token,
            'message': 'Registered successfully.'
        })
        new_user.close()
        # os
        try:
            path = CONFIG.App.DATADIR
            if not os.path.exists(path):
                os.mkdir(path)
            os.mkdir(os.path.join(path, modify_data_path(username)))
        except OSError as e:
            response.set_error(
                Response.Error.UNPROCESSABLE_ENTITY,
                'could not setup data directory: {}'.format(e)
            )
    
    gc.collect()

    dict_      = response.to_dict()
    save_response_to_db(dict_)
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code

@app.route(CONFIG.App.Routes.API.User.LOGIN, methods=['POST'])
@logout_required
def login():
    response = Response()
    form = addict.Dict(request.get_json())
    username, password = form['username'], form['password']
    
    user = User.get_user(username=username)
    if not user:
        response.set_error(
            Response.Error.UNPROCESSABLE_ENTITY,
            'No User with username {} found'.format(username)
        )
    elif not verify_password(user.password, password):
        response.set_error(
            Response.Error.ACCESS_DENIED,
            'Password is incorrect.'
        )
    else:
        response.set_data({
            'token': generate_token(user),
            'message': 'Logged in successfully.'
        })
        redis.redis.hset('blacklist', user.username, 'False')

    dict_      = response.to_dict()
    save_response_to_db(dict_)
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code

@app.route(CONFIG.App.Routes.API.User.SIGN_OUT, methods=['POST'])
@login_required
def logout():
    response = Response()
    payload = jwt.decode(request.headers.get('token'), app.config['SECRET_KEY'])
    redis.redis.hset('blacklist', payload['username'], 'True')
    response.set_data({'message': 'Logged out successfully!'})
    
    dict_      = response.to_dict()
    save_response_to_db(dict_)
    json_      = jsonify(dict_)
    code       = response.code

    return json_, code

# for debugging only - to check if JWT token auth is working as expected.
@app.route('/private', methods=['GET'])
@login_required
def private():
    return jsonify({'Secret': 'Messi is better than CR7'})
