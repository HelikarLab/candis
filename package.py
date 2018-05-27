# inspired by npm's package.json
# imports - standard imports
import os
import io
from   setuptools import find_packages

# imports - third-party imports
try: # for pip >= 10
    from pip._internal.req import parse_requirements
except ImportError: # for pip <= 9.0.3
    from pip.req import parse_requirements

# Python 2
try:
	FileNotFoundError
except NameError:
	FileNotFoundError = IOError

basedir = os.path.dirname(__file__)
srcpath = os.path.join(basedir, 'candis', '__attr__.py')

with open(srcpath) as f:
	code = f.read()
	exec(code)

def get_long_description(*filepaths):
	for filepath in filepaths:
		abspath = os.path.abspath(filepath)

		if os.path.exists(abspath):
			if os.path.isfile(abspath):
				if os.path.getsize(abspath) > 0:
					with io.open(abspath, mode = 'r', encoding = 'utf-8') as f:
						content = f.read()
			else:
				raise ValueError('Not a file: {filepath}'.format(filepath = abspath))
		else:
			raise FileNotFoundError('No such file found: {filepath}'.format(filepath = abspath))

def get_dependencies(type_ = None, dirpath = 'requirements'):
	abspath = dirpath if os.path.isabs(dirpath) else os.path.join(basedir, dirpath)
	types   = [os.path.splitext(fname)[0] for fname in os.listdir(abspath)]

	if not os.path.exists(abspath):
		raise ValueError('Directory {directory} not found.'.format(directory = abspath))
	elif not os.path.isdir(abspath):
		raise ValueError('{directory} is not a directory.'.format(directory = abspath))

	if type_:
		if type_ in types:
			path         = os.path.join(abspath, '{type_}.txt'.format(type_ = type_))
			dependencies = [str(d.req) for d in parse_requirements(path, session = 'meh')]

			return dependencies
		else:
			raise ValueError('Incorrect dependency type {type_}'.format(type_ = type_))
	else:
		dependencies = dict()
		
		for type_ in types:
			dependencies[type_] = get_dependencies(type_)
		
		return dependencies

package = dict(
	name             = 'candis',
	version          = __version__,
	release          = __release__,
	description      = 'A data mining suite for DNA Microarrays.',
	long_description = get_long_description('README.md', 'LICENSE'),
	homepage         = 'https://candis.readthedocs.io',
	authors          = \
	[
		{ 'name': 'Achilles Rasquinha', 'email': 'achillesrasquinha@gmail.com' }
	],
	maintainers      = \
	[
		{ 'name': 'Achilles Rasquinha', 'email': 'achillesrasquinha@gmail.com' }
	],
	license          = 'GNU General Public License v3.0',
	modules          = find_packages(exclude = ['test']),
	test_modules     = find_packages(include = ['test']),
	classifiers      = \
	[

	],
	keywords         = \
	[
		'data', 'mining', 'suite', 'dna', 'microarray', 'bioinformatics'
	],
	# dependencies     = get_dependencies()
)
