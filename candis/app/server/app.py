import os

# imports - third-party imports
from flask          import Flask
from flask_socketio import SocketIO
from htmlmin.minify import html_minify

# imports - module imports
from candis.config   import CONFIG
from candis.resource import R
from candis.app.server.db import db
from candis.app.server.marshmallow import ma

app      = Flask(__name__,
    template_folder = R.Path.TEMPLATES,
    static_folder   = R.Path.ASSETS
)

# TODO: add envparse support?
app.config['SECRET_KEY'] = 'super_secret_key' # os.urandom(24)
socketio = SocketIO(app)
os.environ['DATABASE_URL'] = 'postgresql://postgres:postgres@127.0.0.1:5432/postgres'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['INTEGRATE_SOCKETIO']=True

db.init_app(app)
ma.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.after_request
def minify(response):
    if response.content_type == u'text/html; charset=utf-8':
        data     = response.get_data(as_text = True)
        minified = html_minify(data)

        response.set_data(minified)

    return response
