# imports - standard imports
import os, csv
import re

# imports - third-party imports
import pandas as pd
import addict

# imports - module imports
from candis.resource  import R
from candis.util      import json_load
from candis.ios.cdata import CData

ATTRIBUTE_TYPES   = json_load(os.path.join(R.Path.DATA, 'attribute-types.json'))

def get_attribute_pattern():
    wrapper     = '({regex})?'
    regex       = '|'.join([attp['tag'] for attp in ATTRIBUTE_TYPES])

    pattern     = re.compile(wrapper.format(regex = regex))

    return pattern

ATTRIBUTE_PATTERN = get_attribute_pattern()

def get_attribute_type(attr, data):
    kind        = None

    for attp in ATTRIBUTE_TYPES:
        if attr in attp['tag']:
            kind = attr['name']

    if not kind:
        # TODO: check attribute type using data provided
        kind    = ''

    return kind

def sanitize_attribute(attr):
    name = re.sub(ATTRIBUTE_PATTERN, '', attr)
    name = name.strip()

    return name

def get_attribute_metadata(attr, data):
    kind     = get_attribute_type(attr, data)
    name     = sanitize_attribute(attr)

    metadata = addict.Dict()
    metadata.type = kind
    metadata.name = name

    return metadata

def read(path, *args, **kwargs):
    cdat     = CData.load(path)

    return cdat

    
