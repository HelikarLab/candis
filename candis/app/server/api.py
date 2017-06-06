# imports - module imports
from candis.app.server.app import app
from candis.config import CONFIG

@app.route(CONFIG.App.Routes.FILE, methods = ['GET', 'POST'])
def file():
    pass
