# imports - third-party imports
import requests

# imports - module imports
from candis.util import assign_if_none
from candis.data import GEO

class API():
    def __init__(self, name):
        self.name = name
        

