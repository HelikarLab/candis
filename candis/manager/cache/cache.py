# imports - standard imports
import os, errno

# imports - module imports
from candis.util import assign_if_none, makedirs

class Cache(object):
    '''
    A cache manager for local cache storage.
    '''
    def __init__(self, location = None, dirname = None):
        # TODO: type check - location (str, path-like object)
        # TODO: type check - dirname  (str, path-like object)
        dirhome       = os.path.expanduser('~')
        self.location = assign_if_none(location, dirhome)
        self.dirname  = assign_if_none(dirname, '.{dirname}'.format(
             dirname  = CONFIG.NAME
        ))

        self.dirpath  = os.path.join(self.location, self.dirname)

    def create(self, ignore_exists = True):
        pass
