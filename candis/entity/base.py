# imports - standard imports
from abc import ABCMeta

# imports - module imports
from six import with_metaclass

# QUERY: Should it be abstract or concrete?
class CandisEntity(with_metaclass(ABCMeta)):
    pass
