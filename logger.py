# imports - standard imports
import logging

def get_logger(name=None, logfile=None):
    logging.basicConfig()
    logger = logging.getLogger(name or __name__)
    logger.setLevel(logging.DEBUG)
    logger.propagate = False

    if not logger.handlers:
        formatter = logging.Formatter("%(asctime)s | {%(pathname)s:%(lineno)d - %(funcName)s} %(levelname)s %(message)s", "%H:%M:%S")

        fileHandler   = logging.FileHandler(logfile or 'candis.log', mode='a')
        fileHandler.setFormatter(formatter)
        logger.addHandler(fileHandler)

        formatter = logging.Formatter("%(asctime)s | %(message)s", "%H:%M:%S")

        handler   = logging.StreamHandler()
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger
