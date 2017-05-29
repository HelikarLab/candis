# imports - standard imports
import os

# imports - module imports
from candis.util import assign_if_none
from candis.app  import app

def main(argv = None):
	code = os.EX_OK

	app.run(debug = True)

	return code
