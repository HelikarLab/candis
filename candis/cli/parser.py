# imports - standard imports
import argparse

class ArgumentParser(argparse.ArgumentParser):
    def __init__(self, config, *args, **kwargs):
        self.super  = super(ArgumentParser, self)
        self.config = config

    def parse(self):
        args = self.parse_args()

        return args
