# imports - standard imports
import json

# imports - third-party imports
import addict

# imports - module imports
from candis.config import CONFIG
from candis.util   import (
    assign_if_none,
    get_rand_uuid_str
)

class Response(object):
    '''
    A Response helper object to throw on request.
    '''
    class Status(object):
        SUCCESS = 'success'
        FAILURE = 'fail'
        ERROR   = 'error'

    def __init__(self, status = None, code = 200):
        self.version = CONFIG.VERSION
        self.id      = get_rand_uuid_str()
        self.status  = assign_if_none(status, Response.Status.SUCCESS)
        self.code    = code

        self.schema  = addict.Dict()

        self.schema.id      = get_rand_uuid_str()
        self.schema.version = self.version
        self.schema.status  = self.status

    def set_data(self, data):
        self.data        = data
        self.schema.data = self.data

    def to_dict(self):
        dict_ = dict(self.schema)

        return dict_
