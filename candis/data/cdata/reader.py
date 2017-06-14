# imports -  standard imports
import csv, re

# imports - third-party imports
import addict

PATTERN_COLUMN = re.compile('(!file)?')

def get_attribute_metadata(attr, data):
    tipe          = re.search(PATTERN_COLUMN, attr)
    name          = re.sub(PATTERN_COLUMN, '', attr).strip()

    metadata      = addict.Dict()
    metadata.name = name
    metadata.type = ''

    return metadata

def read(path):
    with open(path, mode = 'r') as f:
        reader          = csv.reader(f)
        rows            = [row for row in reader]
        columns         = list(zip(*rows))
        attrs           = rows[0]

        data            = addict.Dict()
        data.attributes = list()
        data.data       = list()

        for i, attr in enumerate(attrs):
            metadata    = get_attribute_metadata(attr, columns[i])
            attrs[i]    = metadata.name

            data.attributes.append(metadata)

        for i in range(1, len(rows)):
            wrap     = addict.Dict()
            row      = rows[i]
            for j, value in enumerate(row):
                wrap[attrs[j]] = value

            data.data.append(wrap)

    return data
