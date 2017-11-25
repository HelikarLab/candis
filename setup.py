#!/usr/bin/env python

import sys
import os
import shutil
import codecs

from distutils.core import Command
from distutils.command.clean import clean as Clean

from package import package

ABSPATH_ROOTDIR              = os.path.dirname(os.path.abspath(__file__))
RELPATH_FILES_CLEAN          = ['build', 'dist', '{name}.egg-info'.format(name = package['name']), '.cache']
RELPATH_WALK_FILES_EXT_CLEAN = ['.pyc', '.DS_Store']
RELPATH_WALK_DIRS_CLEAN      = ['__pycache__']

class CleanCommand(Clean):
    def run(self):
        Clean.run(self)

        for filename in RELPATH_FILES_CLEAN:
            if os.path.exists(filename):
                shutil.rmtree(filename)

        for dirpath, dirnames, filenames in os.walk(ABSPATH_ROOTDIR):
            for filename in filenames:
                for extension in RELPATH_WALK_FILES_EXT_CLEAN:
                    if filename.endswith(extension):
                        path = os.path.join(dirpath, filename)
                        os.unlink(path)

            for dirname in dirnames:
                if dirname in RELPATH_WALK_DIRS_CLEAN:
                    path = os.path.join(dirpath, dirname)
                    shutil.rmtree(path, ignore_errors = True)

class TestCommand(Command):
    user_options = [('pytest=', 'a', 'arguments to be passed to pytest')]

    def initialize_options(self):
        self.args_pytest = [ ]

    def finalize_options(self):
        pass

    def run(self):
        import pytest

        errno = pytest.main(self.args_pytest)

        sys.exit(errno)

def main(argv = None):
    code = os.EX_OK
    
    try:
        from setuptools import setup
        args_setuptools = dict(
            keywords    = ', '.join([keyword for keyword in package['keywords']])
        )
    except ImportError:
        from distutils.core import setup
        args_setuptools = dict()

    metadata = dict(
        name             = package['name'],
        version          = package['version'],
        description      = package['description'],
        long_description = package['long_description'],
        author           = ','.join([author['name'] for author in package['authors']]),
        author_email     = ','.join([author['email'] for author in package['authors']]),
        maintainer       = ','.join([maintainer['name'] for maintainer in package['maintainers']]),
        maintainer_email = ','.join([maintainer['email'] for maintainer in package['maintainers']]),
        license          = package['license'],
        packages         = package['modules'],
        url              = package['homepage'],
        install_requires = package['dependencies']['production'],
        cmdclass         = dict(
            clean = CleanCommand, test = TestCommand
        ),
        include_package_data = True,
        entry_points     = dict(
            console_scripts = [
                'candis = candis:main'
            ]
        ),
        **args_setuptools
    )

    setup(**metadata)

    return code

if __name__ == '__main__':
    args = sys.argv[1:]
    code = main(args)

    sys.exit(code)