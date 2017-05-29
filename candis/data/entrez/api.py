# imports - third-party imports
import requests

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

# TODO: Should we cache each response?
class API(object):
    # TODO: Assign CONFIG.NAME to NAME
    NAME = 'candis'

    def __init__(self, email, name = None):
        # TODO: type check and validate - email (str), valid email
        # TODO: type check - name (str)
        # TODO: Maybe try saving base parameters as environment variables?

        self.email      = email
        self.name       = assign_if_none(name, Client.NAME)

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
        # TODO: type check - db (str), or None
        # TODO: type check - refresh_cache (bool)

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
                # TODO: Raise ValueError, invalid database
                pass

        return returns
