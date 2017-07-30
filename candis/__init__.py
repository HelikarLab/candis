# module - candis
from candis.config    import Config, get_config, CONFIG
from candis.ios       import cdata, pipeline
from candis.ios.cdata import CData
# candis.cli
from candis.cli    import main

__version__ = CONFIG.VERSION
