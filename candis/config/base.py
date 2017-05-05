# imports - standard imports
import os

# imports - module imports
from candis.util import pardir

class BaseConfig(object):
    NAME    = 'candis'
    VERSION = (0, 1, 0)
    LOGO    = '''
                                888 d8b
                                888 Y8P
                                888
 .d8888b  8888b.  88888b.   .d88888 888 .d8888b
d88P"        "88b 888 "88b d88" 888 888 88K
888      .d888888 888  888 888  888 888 "Y8888b.
Y88b.    888  888 888  888 Y88b 888 888      X88
 "Y8888P "Y888888 888  888  "Y88888 888  88888P' {version}'''.format(
        version = VERSION
    )

    class Color(object):
        PRIMARY = '#F76363'

    class Path(object):
        ROOT   = os.path.abspath(pardir(__file__, 2))
        APP    = os.path.join(ROOT,   'app')
        ASSETS = os.path.join(APP,    'assets')
        IMAGES = os.path.join(ASSETS, 'img')
        ICONS  = os.path.join(IMAGES, 'icons')
