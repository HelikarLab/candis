# imports - third-party imports
from flask import Flask
from htmlmin.minify import html_minify

# imports - module imports
from candis.resource import R

app = Flask(__name__,
    template_folder = R.Path.TEMPLATES,
    static_folder   = R.Path.ASSETS
)

@app.after_request
def minify(response):
    if response.content_type == u'text/html; charset=utf-8':
        data     = response.get_data(as_text = True)
        minified = html_minify(data)

        response.set_data(minified)

    return response
