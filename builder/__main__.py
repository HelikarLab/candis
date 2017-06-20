# imports - standard imports
import sys, os
import json

# imports - third-party imports
from candis.config   import CONFIG
from candis.resource import R

def main(args = None):
    code = os.EX_OK

    path = os.path.join(R.Path.APP, 'client/app/config.json')
    dikt = CONFIG.App.schema

    with open(path, 'w') as f:
        json.dump(dikt, f, indent = 4)

    return code

if __name__ == '__main__':
    args = sys.argv[1:]
    code = main(args)

    sys.exit(code)
