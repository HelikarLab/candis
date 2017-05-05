# imports - module imports
from candis.entity.base import CandisEntity
from candis.util import assign_if_none, get_uuid_str

class Experiment(CandisEntity):
    def __init__(self, name = None):
        self.name = assign_if_none(name, get_uuid_str())

    @staticmethod
    def load(path):
        raise NotImplementedError

    def save(self):
        raise NotImplementedError
