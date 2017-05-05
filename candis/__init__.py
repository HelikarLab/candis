# module - candis
from candis.util   import get_version_str
from candis.config import BaseConfig
from candis.cli    import main

# STUB
from candis import app
# end STUB

__version__ = get_version_str(BaseConfig.VERSION)
