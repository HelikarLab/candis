# imports - third-party imports
from flask import Flask

# imports - module imports
from candis.resource import R

app = Flask(__name__,
    template_folder = R.Path.TEMPLATES,
    static_folder   = R.Path.ASSETS
)
