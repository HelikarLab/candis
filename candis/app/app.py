# imports - third-party imports
from PyQt5 import QtWidgets

# imports - module imports
from candis.app.window import MainWindow

class App(QtWidgets.QApplication):
    def __init__(self, *args, **kwargs):
        self.super = super(App, self)
        self.super.__init__(*args, **kwargs)

        self.create_ui()

    def create_ui(self):
        self.main_window = MainWindow()

    def show(self):
        self.main_window.show()
