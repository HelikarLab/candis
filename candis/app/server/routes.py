# imports - standard imports
from flask import render_template

# imports - module imports
from candis.app.server import app
from candis.config import CONFIG

@app.route(CONFIG.App.Routes.BASE)
def index(page = { }):
    template = render_template('pages/index.html', config = CONFIG.App, page = page)

    return template
