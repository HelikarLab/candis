# imports - standard imports
import os

# imports - module imports
from candis.cli.parser import create_parser
from candis import app

def main():
    code   = os.EX_OK
    parser = create_parser()

    app.main()

    return code
