# imports - third-party imports
from PyQt5 import QtWidgets, QtGui

# imports - module imports
from candis.util import has_key

class Action(QtWidgets.QAction):
    def __init__(self, *args, **kwargs):
        self.super = super(Action, self)
        self.super.__init__(*args, **kwargs)

    @staticmethod
    def from_config(config, parent = None):
        action = Action(parent)

        if has_key(config, 'icon'):
            icon = QtGui.QIcon(config['icon'])
            action.setIcon(icon)

        if has_key(config, 'shortcut'):
            seq  = QtGui.QKeySequence(config['shortcut'])
            action.setShortcut(seq)

        if has_key(config, 'tip'):
            action.setStatusTip(config['tip'])

        if has_key(config, 'title'):
            action.setText('&{title}'.format(title = config['title']))

        return action
