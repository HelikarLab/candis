import sys
import os

import click
from honcho.manager import Manager

REDIS_PORT = os.environ.get('CANDIS_REDIS_PORT') or 6379

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

