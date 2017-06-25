# imports - standard imports
import os, csv
import re

# imports - third-party imports
import addict

# imports - module imports
from candis.resource import R
from candis.util     import json_load

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

def read(path, delimiter = ','):
    dataset            = addict.Dict()
    dataset.attributes = [ ]
    dataset.data       = [ ]

    with open(path, mode = 'r') as f:
        reader      = csv.reader(f, delimiter = delimiter)
        buffer_     = [row for row in reader]

        attrs, rows = buffer_[0], buffer_[1:]
        columns     = list(zip(*rows))

        for i, attr in enumerate(attrs):
            metadata = get_attribute_metadata(attr, columns[i])

            dataset.attributes.append(metadata)

        for row in rows:
            meta = addict.Dict()

            for i, value in enumerate(row):
                attr            = dataset.attributes[i]
                meta[attr.name] = value

            dataset.data.append(meta)

    return dataset
