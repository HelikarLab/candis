# imports - third-party imports
import wget

# imports - module imports
from candis.util import assign_if_none
from candis.data import GEO

class API():
    def __init__(self, ftype='suppl'):
        self.ftype = ftype

    def set_path(self, path=''):
        self.path = path

    def get_path(self):
        return self.path

    def raw_data(self, ftp_link, series_accession):
        url = '/'.join(ftp_link, 'suppl', series_accession + '_RAW.tar')
        wget.download(url, self.path)
        print("Downloaded!")
        return 'success'

