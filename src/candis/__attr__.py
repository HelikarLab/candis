import sys
import os
import os.path as osp
import subprocess

PY2 = sys.version_info.major == 2

try:
    FileNotFoundError
except NameError:
    if PY2:
        FileNotFoundError = OSError


def read(fname):
    with open(fname) as f:
        data = f.read()
    return data


def pardir(fname, level=1):
    for _ in range(level):
        fname = osp.dirname(fname)
    return fname


def strip(string):
    string = string.lstrip()
    string = string.rstrip()
    return string


def safe_decode(object_, encoding="utf-8"):
    decoded = object_

    try:
        decoded = object_.decode(encoding)
    except AttributeError:
        pass

    return decoded


def sequence_filter(list_, filter_, type_=list):
    result = type_(filter(filter_, list_))
    return result


def get_revision(path, short=False, raise_err=True):
    """
    Returns the git revision of a repository. Raises error if not a valid git repository.
    """
    revision = None

    try:
        short = "--short" if short else ""
        with open(os.devnull, "w") as NULL:
            output = subprocess.check_output(sequence_filter(["git", "rev-parse", short, "HEAD"], filter_=None),
                                             stderr=NULL, cwd=path)
        revision = safe_decode(strip(output))
    except (subprocess.CalledProcessError, FileNotFoundError):
        if raise_err:
            raise

    return revision


path = dict()
path["base"] = pardir(__file__)
path["version"] = osp.join(path["base"], "VERSION")

__name__ = "candis"
__command__ = "candis"
__version__ = strip(read(path["version"]))
__build__ = get_revision(pardir(path["base"], 2), short=True, raise_err=False)
__url__ = "https://github.com/HelikarLab/candis"
__author__ = "HelikarLab Developers"
__email__ = "hello.helikarlab@gmail.com"
__description__ = "A data mining suite for gene expression data"
__keywords__ = ["data", "mining", "suite", "gene", "expression", "data"]
__license__ = "MIT"
