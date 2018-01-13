include .env

.PHONY: build
.PHONY: docs

BASEDIR      = $(realpath .)
MODULE       = candis
SOURCEDIR    = $(realpath $(MODULE))
DOCSDIR      = $(realpath docs)

VIRTUALENV   = virtualenv

VENV         = venv
PYBINARIES   = $(VENV)/bin

PYTHON       = $(PYBINARIES)/python
PIP          = $(PYBINARIES)/pip
IPYTHON      = $(PYBINARIES)/ipython
HONCHO       = $(PYBINARIES)/honcho
PYTEST       = $(PYBINARIES)/pytest
TWINE        = $(PYBINARIES)/twine

NODE_MODULES = $(BASEDIR)/node_modules
NODEBINARIES = $(NODE_MODULES)/.bin

YARN        ?= yarn
BUNDLER     ?= bundler

venv:
	pip3 install $(VIRTUALENV)

	$(VIRTUALENV) $(VENV) --python python3

clean.py:
	$(PYTHON) setup.py clean

clean:
	make clean.py
	
	rm -rf .sass-cache

	clear
	
clean.force:
	rm -rf $(BASEDIR)/node_modules
	rm -rf $(DOCSDIR)/build

	make clean
	
install:
	cat $(BASEDIR)/requirements/*.txt          > $(BASEDIR)/requirements-dev.txt
	cat $(BASEDIR)/requirements/production.txt > $(BASEDIR)/requirements.txt

	$(PIP) install numpy
	$(PIP) install -r $(BASEDIR)/requirements-dev.txt

	$(YARN) install

	$(BUNDLER) install

	$(PYTHON) setup.py develop

	make clean

upgrade:
	$(YARN) upgrade

test:
	make install

	$(PYTEST)

	make clean.py

build:
	$(PYTHON) -B -m builder

	$(YARN) run build

	make clean

docs:
	cd $(DOCSDIR) && make html

sass:
	$(YARN) run sass

sass.watch:
	$(YARN) run sass.watch

docker.build:
	docker build -t $(MODULE) $(BASEDIR)

console:
	$(IPYTHON) 

start:
ifeq ($(ENV), development)
	$(HONCHO) start --procfile $(BASEDIR)/Procfile.dev
else
	$(HONCHO) start
endif

release:
ifeq ($(ENV), production)
	make clean
	
	$(PYTHON) setup.py sdist bdist_wheel

	$(TWINE) upload -r candis $(BASEDIR)/dist/*

	make clean
else
	@echo "Unable to release. Make sure the environment is in production mode."
endif