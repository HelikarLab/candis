# imports - standard imports
import json

# imports - third-party imports
import addict

# imports - module imports
from candis.util import assign_if_none

def write(path, pipeline = None):
    pipeline = assign_if_none(pipeline, addict.Dict({
        'stages': [ ],
         'links': [ ]
    }))

    with open(path, mode = 'w') as f:
        json.dump(pipeline, f, indent = 4)