# imports - standard imports
import os, csv

# imports - module imports
from candis.resource import R
from candis.util     import json_load

ATTRIBUTE_TYPES  = json_load(os.path.join(R.Path.DATA, 'attribute-types.json'))

def get_attribute_tag(attr):
    tag          = None

    if 'type' in attr:
        for attp in ATTRIBUTE_TYPES:
            if attr['type'] == attp['name']:
                tag  = attp['tag']

    return tag

def write(path, dataset, delimiter = ','):
    print(dataset)
    with open(path, 'w') as f:
        writer  = csv.writer(f, delimiter = delimiter)
        cnames  = [ ]

        for attr in dataset['attributes']:
            tag   = get_attribute_tag(attr)
            name  = attr['name']
            cname = (tag + ' ' + name) if tag else name

            cnames.append(cname)

        writer.writerow(cnames)

        for data in dataset['data']:
            row  = [ ]
            for attr in dataset['attributes']:
                value = data[attr['name']]

                row.append(value)

            writer.writerow(row)
