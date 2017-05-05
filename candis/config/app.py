# imports - standard improts
import os

# imports - module imports
from candis.config.base import BaseConfig
from candis.util import get_version_str

class AppConfig(BaseConfig):
    class Window(object):
        class Main(object):
            TITLE    = '{name} v{version}'.format(
                name    = BaseConfig.NAME,
                version = get_version_str(BaseConfig.VERSION)
            )

            ICON     = os.path.join(BaseConfig.Path.ICONS, 'logo.png')

            WIDTH    = 640
            HEIGHT   = 480
            SIZE     = (WIDTH, HEIGHT)
            POSITION = { 'x': 50, 'y': 50 }

    class Menu(object):
        class Main(object):
            class File(object):
                TITLE   = 'File'

                class Action(object):
                    NEW  = { 'title': 'New',
                        'icon': os.path.join(BaseConfig.Path.ICONS, 'file.png'),
                        'shortcut': 'Ctrl+N', 'tip': 'Create a new Experiment',
                        'priority': 1 }
                    QUIT = { 'title': 'Quit',
                        'icon': os.path.join(BaseConfig.Path.ICONS, 'quit.png'),
                        'shortcut': 'Ctrl+Q', 'tip': 'Quit {name}'.format(name = BaseConfig.NAME),
                        'priority': 2 }
