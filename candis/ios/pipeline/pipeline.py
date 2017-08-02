# imports - standard imports
import sys, os
import random
import threading

# imports - third-party imports
import addict
import numpy as np
from weka.core                import jvm as JVM
from weka.core.converters     import Loader
from weka.filters             import Filter # Cross-Validation
from weka.attribute_selection import ASSearch, ASEvaluation, AttributeSelection

# imports - module imports
from candis.config import CONFIG
from candis.ios    import cdata
from candis.util   import assign_if_none

class Pipeline(object):
    CONFIG   = CONFIG.Pipeline

    PENDING  = addict.Dict({ 'name': 'pending' })
    RUNNING  = addict.Dict({ 'name': 'running' })
    FAILED   = addict.Dict({ 'name': 'failed'  })

    def __init__(self, config = { }):
        self.status = Pipeline.PENDING
        self.config = Pipeline.CONFIG

        self.set_config(config)

    def set_config(self, config):
        self.config.update(config)

    def set_status(self, status):
        self.status = status

    def run(self, path, delimitter = ',', heap_size = 512, seed = None):
        self.set_status(Pipeline.RUNNING)

        if not os.path.isabs(path):
          path      = os.path.abspath(path)

        if not os.path.exists(path):
          self.set_status(Pipeline.FAILED)

          raise IOError('{path} does not exists.'.format(path = path))

        if not os.path.isfile(path):
          self.set_status(Pipeline.FAILED)

          raise IOError('{path} is not a valid input file.'.format(path = path))

        name        = '{path}.arff'.format(path = os.path.splitext(path)[0])
        cdat        = cdata.read(path, delimitter = delimitter)

        para        = self.config

        # data.toARFF(name, express_config = para.Preprocess)

        # Runner Thread
        JVM.start()

        JVM.stop()