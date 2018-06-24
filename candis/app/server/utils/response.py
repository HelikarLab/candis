from flask import jsonify
import json
import addict

from candis.app.server.models.response import Response as ResponseModel

def save_response_to_db(dict_):
    dict_ = dict_.copy()
    if 'error' in dict_:
        dict_.update(dict(
            data = json.dumps(dict_['data']),
            error = json.dumps(dict_['error'])
        ))
    else:
        dict_.update(dict(
            data = json.dumps(dict_['data']),
            error = json.dumps({})
        ))
    resp = ResponseModel(**dict_)
    resp.add_response()
    print("Changing data or error!!!!---------------------------")
    last_added = ResponseModel.get_response(id=dict_['id'])
    print(json.loads(last_added.data))
    print(json.loads(last_added.error))
    error = json.loads(last_added.error)
    print("Type of error is: {}".format(type(error)))
    print("Last added id is: {}".format(last_added.id_))
    error = json.dumps(dict(modify='error class', key2='I am modified!'))
    last_added.error = error
    last_added.add_response()
    last_added = ResponseModel.get_response(id=dict_['id'])
    print("Last added id is: {}".format(last_added.id_))
    print("Last Added error-")
    print(json.loads(last_added.error))