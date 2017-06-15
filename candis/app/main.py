# imports - standard imports
import os

# imports - module imports
from candis.config import CONFIG
from candis.util   import get_free_port
from candis.app    import app

def main(argv = None):
	code  = os.EX_OK

	host  = CONFIG.App.HOST
	port  = get_free_port(seed = CONFIG.App.PORT)
	debug = CONFIG.DEBUG

	app.run(host = host, port = port, debug = debug)

	return code
