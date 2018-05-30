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
        try:
            return self.path
        except:
            return ''

    def raw_data(self, ftp_link, series_accession):
        url = ''.join([ftp_link, 'suppl/', series_accession + '_RAW.tar'])
        print("URL: ----------------------------- {}".format(url))
        wget.download(url, self.get_path())
        #print("Downloading to {}".format())
        print("Downloaded!")
        return 'success'

