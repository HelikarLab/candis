import re

# imports - third-party imports
import requests
from urllib.parse import urlencode 

# imports - module imports
from candis.util import assign_if_none
from candis.data import entrez

def sanitize_response(response, type_ = 'json'):
    if type_ == 'json':
        data  = response.json()
        try:
            kres  = data['header']['type'] + 'result'
            data = data[kres]
        except KeyError:
            kres = 'result'  # for esummary
            data = data[kres]
    else:
        # TODO: What other types can be handled? XML, HTML, etc.
        pass

    return data

def sanitize_term(term):
    if isinstance(term, list) and term:
        term = [t.replace(' ','') for t in term]
        return ' AND '.join(term)
    else:
        raise TypeError('term should be a list with atleast 1 item')

def params_dict2string(params):
    if isinstance(params, dict):
        return str(urlencode(params)).replace('%40', '@')
    else:
        raise TypeError('params should be a dictionary')


# TODO: Should we cache each response?
class API(object):
    # TODO: Assign CONFIG.NAME to NAME
    NAME = 'candis'

    def __init__(self, email, name = None, api_key = None):
        # TODO: type check and validate - email (str), valid email
        if isinstance(email, str):
            if re.match(r"^[0-9a-z-]+(\.[0-9a-z-])*@[0-9a-z-]+(\.[0-9a-z-]+)*(\.[a-z]{2,4})$", email):
                self.email = email
            else:
                raise ValueError("Email is incorrect")
        else:
            raise TypeError('name should be a string')

        if not isinstance(name, str):
            raise TypeError('name should be a string')
        
        if api_key and not isinstance(api_key, str):
            raise TypeError('api_key should be a string')
        # TODO: Maybe try saving base parameters as environment variables?

        self.email      = email
        self.name       = assign_if_none(name, 'candis')#Client.NAME)
        self.api_key    = api_key

        # TODO: Should we cache databases? - using Redis ?
        self.databases  = self.info(refresh_cache = True)

    @property
    def baseparams(self):
        params = dict({ 'tool': self.name, 'email': self.email,
                        'api_key': self.api_key, 'retmode': 'json' })

        return params

    def request(self, method, url, parameters = None, *args, **kwargs):
        parameters = assign_if_none(parameters, dict())
        params     = self.baseparams
        if not params['api_key']:
            del params['api_key']
        params.update(parameters)
        parameter_string = params_dict2string(params)

        response = requests.request(method, url, params = parameter_string, *args, **kwargs)
        if response.ok:
            data = sanitize_response(response, params['retmode'])
        else:
            response.raise_for_status()

        return data

    def info(self, db = None, refresh_cache = False):
        
        if db and not isinstance(db, str):
            raise TypeError("db should be a string")

        if not isinstance(refresh_cache, bool):
            raise TypeError("refresh_cache should be a boolean value")
     
        # Check if we haven't cached database list
        if not hasattr(self, 'databases') or refresh_cache:
            # GET is do-able
            data           = self.request('get', entrez.const.URL.INFO)
            # Clean response
            self.databases = data['dblist']

        returns = self.databases

        # Check if db is not None or not an empty string
        if db:
            if db in self.databases:
                # Passed conditions, get info
                data      = self.request('get', entrez.const.URL.INFO, { 'db': db })
                returns   = data['dbinfo']
            else:
                # TODO: Raise ValueError, invalid database
                raise ValueError('db should be from : {}'.format(self.databases))

        return returns
        
    def search(self, db = 'pubmed', term = [], **optional):
        
        # neglect term parameter if query_key present
        if(optional.get('query_key') and optional.get('WebEnv')):
            optional.update({'db': db})
            data = self.request('get', entrez.const.URL.SEARCH, optional)
            return data

        term = sanitize_term(term)
        params = dict({ 'db': db, 'term': term })
        params.update(optional)
        data = self.request('get', entrez.const.URL.SEARCH, params)
        
        return data

    def summary(self, db = 'pubmed', id = [], **optional):
        
        if(optional.get('query_key') and optional.get('WebEnv')):
            optional.update({'db': db})
            data = self.request('get', entrez.const.URL.SUMMARY, optional)
            return data

        params = dict({ 'db': db, 'id': id})
        params.update(optional)
        data = self.request('get', entrez.const.URL.SUMMARY, params)
        
        return data


