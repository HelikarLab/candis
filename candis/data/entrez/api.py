# imports - third-party imports
import requests
import re

# imports - module imports
from candis.util import assign_if_none
from candis.data import entrez

def sanitize_response(response, type_ = 'json'):
    if type_ == 'json':
        data  = response.json()
        kres  = data['header']['type'] + 'result'

        data  = data[kres]
    else:
        # TODO: What other types can be handled? XML, HTML, etc.
        pass

    return data

class EmailNotValidError(ValueError):
	"""Parent class of all exceptions raised by this module."""
	pass

class InvalidDatabaseError(ValueError):
	"""Parent class of all exceptions raised by this module."""
	pass

# TODO: Should we cache each response?
class API(object):
    # TODO: Assign CONFIG.NAME to NAME
    NAME = 'candis'

    def __init__(self, email, name = None):
        
        if isinstance(email, (str, unicode)):
            if re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', email):
                self.email=email
            else:
                raise EmailNotValidError("email syntax is not valid")
        else:
            raise EmailNotValidError("email is not of type str")
        
        if name != None:
            if isinstance(name, (str, unicode)):
                self.name = name
            else:
                raise ValueError("name is not str")
        else:
            self.name = Client.NAME

        # TODO: Should we cache databases?
        self.databases  = self.info(refresh_cache = True)

    @property
    def baseparams(self):
        params = dict({ 'tool': self.name, 'email': self.email,
                        'retmode': 'json' })

        return params

    def request(self, method, url, parameters = None, *args, **kwargs):
        parameters = assign_if_none(parameters, dict())
        params     = self.baseparams
        params.update(parameters)

        response = requests.request(method, url, params = params, *args, **kwargs)
        if response.ok:
            data = sanitize_response(response, params['retmode'])
        else:
            response.raise_for_status()

        return data

    def info(self, db = None, refresh_cache = False):
        if db != None:
            if not isinstance(db, (str, unicode)):
                raise ValueError("db is not str")
        
        if not isinstance(refresh_cache, bool):
            raise ValueError("refresh_cache is not bool")

        # Check if we haven't cached database list
        if not hasattr(self, 'databases') or refresh_cache:
            # GET is do-able
            data           = self.request('get', entrez.api.URL.INFO)
            # Clean response
            self.databases = data['dblist']

        returns = self.databases

        # Check if db is not None or not an empty string
        if db:
            if db in self.databases:
                # Passed conditions, get info
                data      = self.request('get', entrez.api.URL.INFO, { 'db': db })
                returns   = data['dbinfo']
            else:
                raise InvalidDatabaseError("Invalid entrez database")

        return returns
