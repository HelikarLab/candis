-include .env

.PHONY: build
.PHONY: docs

BASEDIR      = $(realpath .)
MODULE       = candis

SOURCEDIR    = $(realpath $(MODULE))
DOCSDIR      = $(realpath docs)

PIPENV      ?= pipenv
PYBINARIES   = $(shell pipenv --venv)/bin
PYTHON      ?= $(PYBINARIES)/python


PYTHON       = $(PYBINARIES)/python
PIP          = $(PYBINARIES)/pip
IPYTHON      = $(PYBINARIES)/ipython
HONCHO       = $(PYBINARIES)/honcho
PYTEST       = $(PYBINARIES)/pytest
TWINE        = $(PYBINARIES)/twine

NODE_MODULES = $(BASEDIR)/node_modules
NODEBINARIES = $(NODE_MODULES)/.bin

YARN        ?= yarn

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
	$(PIPENV)  install
	$(YARN)    install

	$(PYTHON) setup.py develop

	make clean

lock:
	# Lock Dependencies
	$(PIPENV) lock --requirements 		> $(BASEDIR)/requirements.txt
	$(PIPENV) lock --requirements --dev > $(BASEDIR)/requirements-dev.txt

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