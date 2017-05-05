# imports - standard imports
import sys
import os

# imports - third-party imports
from PyQt5 import QtWidgets, QtGui

# imports - module imports
from candis.config.base   import BaseConfig
from candis.config.app    import AppConfig
from candis.app.ui.action import Action

# QUERY: Should we extend MainWindow to QWidget or QMainWindow?
# QWidget is more flexible compared to QMainWindow
class MainWindow(QtWidgets.QMainWindow):
    def __init__(self, *args, **kwargs):
        self.super = super(MainWindow, self)
        self.super.__init__(*args, **kwargs)

        self.create_ui()

    def create_ui(self):
        position = AppConfig.Window.Main.POSITION
        w, h     = AppConfig.Window.Main.SIZE
        self.setGeometry(position['x'], position['y'], w, h)

        title    = AppConfig.Window.Main.TITLE
        self.setWindowTitle(title)

        path     = AppConfig.Window.Main.ICON
        icon     = QtGui.QIcon(path)
        self.setWindowIcon(icon)

        self.create_main_menu()

    def create_main_menu(self):
        action_quit = Action.from_config(AppConfig.Menu.Main.File.Action.QUIT, self)
        action_quit.triggered.connect(self.on_quit)

        action_new  = Action.from_config(AppConfig.Menu.Main.File.Action.NEW , self)

        bar_status  = self.statusBar()

        menu_main   = self.menuBar()

        title       = AppConfig.Menu.Main.File.TITLE
        menu_file   = menu_main.addMenu('&{title}'.format(title = title))
        menu_file.addAction(action_new)
        menu_file.addAction(action_quit)

    def on_quit(self):
        # TODO: Show dialog maybe, to save an experiment, etc.

        self.quit()

    def quit(self):
        code = os.EX_OK

        sys.exit(code)
