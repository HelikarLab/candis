# Inspired by npm's package.json file
name              = 'candis'
version           = '0.1.0'
release           = '0.1.0'
description       = 'A data mining suite for DNA microarrays'
long_description  = ['README.md']
keywords          = [ ]
authors           = [
    { 'name': 'Achilles Rasquinha', 'email': 'achillesrasquinha@gmail.com' }
]
maintainers       = [
    { 'name': 'Achilles Rasquinha', 'email': 'achillesrasquinha@gmail.com' }
]
license           = 'GNU GPL v3'
modules           = [
    'candis',

    'candis.app',
    'candis.app.client',
    'candis.app.server',
    'candis.app.server.api',

    'candis.cli',

    'candis.config',

    'candis.data',
    'candis.data.cdata',
    'candis.data.entrez',

    'candis.manager',
    'candis.manager.cache',

    'candis.resource',

    'candis.exception',

    'candis.util'
]
test_modules      = [
    'bulbea.util.test'
]
homepage          = 'https://achillesrasquinha.github.io/candis'
github_username   = 'achillesrasquinha'
github_repository = 'candis'
github_url        = '{baseurl}/{username}/{repository}'.format(
    baseurl    = 'https://github.com',
    username   = github_username,
    repository = github_repository
)
