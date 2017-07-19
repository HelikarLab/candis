# imports - module imports
from candis.util import json_load

def read(path):
    pipeline = json_load(path)

    return pipeline