# imports - standard imports
import sys

# imports - module imports
import candis

def main():
    argv = [ ]

    app  = candis.app.App(argv)
    app.show()
    code = app.exec_()

    sys.exit(code)
