# imports - standard imports
import os

# imports - third-party imports
from ftplib import FTP
from urllib.parse import urlparse

# imports - module imports
from candis.util import assign_if_none
from logger import get_logger

log = get_logger()

class API():
    def __init__(self, path='', ftype='suppl'):
        self.ftype = ftype
        self.path = path

    def _ftp_connect(self, host, usr=None, pswd=None):
        if usr and pswd:
            ftp = FTP(host, usr, pswd)
        else:
            ftp = FTP(host)
        ftp.login()
        self.ftp = ftp

    def _ftp_close(self):
        if isinstance(self.ftp, FTP):
            self.ftp.quit()
            log.info("Closed successfully!")
        self.ftp = None

    def raw_data(self, ftp_link, series_accession, path=None):

        tar_file = series_accession + '_RAW.tar'
        url = ''.join([ftp_link, 'suppl/', tar_file])
        
        host = urlparse(url).netloc
        file_name = urlparse(url).path
        
        self._ftp_connect(host)

        if path:
            if os.path.exists(os.path.abspath(path)):
                self.path = os.path.abspath(path)
            else:
                raise OSError("given path doesn't exists")
        else:
            if(isinstance(self.path, dict)):
                self.path = ''
            self.path = os.path.abspath(self.path)
        
        file_path = os.path.join(self.path, tar_file)
        
        with open(file_path, 'wb') as f:
            log.info("\n Downloading {} at {} \n".format(tar_file, os.path.abspath(self.path)))
            try:
                self.ftp.retrbinary('RETR '+ file_name, f.write)
                log.info("Downloaded!")
            except EOFError:
                log.error("Connection closed, couldn't download")
            except Exception as e:
                log.error("Error {}".format(e))
            self._ftp_close()
