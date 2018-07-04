import sys
import os

from honcho.manager import Manager
from envparse import env
import click

env.read_envfile()
REDIS_PORT = env.int('CANDIS_REDIS_PORT', default=6379)

@click.command()
@click.option('--env', default='dev', help='working environment')
def run(env):
    m = Manager()
    if env == 'dev':
        m.add_process('web', 'python -m candis')
        m.add_process('node', 'npm start')
        m.add_process('redis', 'redis-server --port {}'.format(REDIS_PORT))
    else:
        m.add_process('web', 'gunicorn candis.app:app')
    m.loop()

    sys.exit(m.returncode)

if __name__ == '__main__':
    run()

