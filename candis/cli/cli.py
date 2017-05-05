# imports - standard imports
import os

# imports - module imports
from candis.cli.parser import create_parser

def main():
    code   = os.EX_OK
    parser = create_parser()

    return code
