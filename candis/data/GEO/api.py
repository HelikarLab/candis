# imports - third-party imports
import wget
import os

# imports - module imports
from candis.util import assign_if_none
from candis.data import GEO

class API():
    def __init__(self, path='', ftype='suppl'):
        self.ftype = ftype
        self.path = path

    def raw_data(self, ftp_link, series_accession, path=None):
        url = ''.join([ftp_link, 'suppl/', series_accession + '_RAW.tar'])
        if path:
            if os.path.exists(os.path.abspath(path)):
                self.path = os.path.abspath(path)
            else:
                raise OSError('given path dont exists')
        else:
            self.path = os.path.abspath(self.path)
        try:
            wget.download(url, self.path)
            print("Downloading at {}".format(os.path.abspath(self.path)))
            print("Succefully Downloaded!")
        except:
            # TODO: raise server error
            print("Unable to download the file")
            return 0
        return self.path

