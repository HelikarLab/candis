# imports - standard imports
try:
    from urlparse import urljoin
except ImportError:
    from urllib.parse import urljoin

class URL(object):
    BASE   = 'ftp://ftp.ncbi.nlm.nih.gov/geo/series/'
    #INFO   = urljoin(BASE, _format.format(name = 'info'))
    #SEARCH = urljoin(BASE, _format.format(name = 'search'))
