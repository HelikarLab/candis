from setuptools import find_packages

name              = 'candis'
version           = '0.1.0'
release           = '0.1.0'
description       = 'A Flask + ReactJS boilerplate'
long_description  = ['README.md']
keywords          = [

]
authors           = [
    { 'name': 'Achilles Rasquinha', 'email': 'achillesrasquinha@gmail.com' }
]
maintainers       = [
    { 'name': 'Achilles Rasquinha', 'email': 'achillesrasquinha@gmail.com' }
]
license           = 'GNU GPL v3'
modules           = find_packages(exclude = ['test'])
test_modules      = find_packages(include = ['test'])
homepage          = 'https://candis.readthedocs.io'
github_username   = 'achillesrasquinha'
github_repository = 'candis'
github_url        = '{baseurl}/{username}/{repository}'.format(
    baseurl    = 'https://github.com',
    username   = github_username,
    repository = github_repository
)