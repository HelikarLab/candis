# imports - standard imports
import os

# imports - module imports
from candis.util import assign_if_none

def make_cachedir(dirpath = None, ignore_exists = True):
    userdir = os.path.expanduser('~')
    pathdir = assign_if_none(dirpath, userdir)
