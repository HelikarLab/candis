include .env

.PHONY: build
.PHONY: docs

PYTHON      ?= python
BASEDIR      = $(realpath .)
PACKAGE      = candis
SOURCEDIR    = $(realpath $(PACKAGE))
DOCSDIR      = $(realpath docs)

SERVER_HOST  = 0.0.0.0
SERVER_PORT ?= 5000

VIRTUALENV   = virtualenv
BASEDIR      = $(realpath .)

PYTHON       = $(PYBINARIES)/python
PIP          = $(PYBINARIES)/pip
HONCHO       = $(PYBINARIES)/honcho

NPM         ?= npm
BUNDLER     ?= bundler

MODULE       = candis
SOURCEDIR    = $(realpath $(MODULE))
DOCSDIR      = $(realpath docs)

venv:
	pip3 install $(VIRTUALENV)

	$(VIRTUALENV) $(VENV) --python python3

clean:
	rm -rf .sass-cache

	$(PYTHON) setup.py clean

	clear
	
clean.force:
	rm -rf node_modules bower_components
	rm -rf $(DOCSDIR)/build

	make clean
	
install:
	cat $(BASEDIR)/requirements/*.txt          > $(BASEDIR)/requirements-dev.txt
	cat $(BASEDIR)/requirements/production.txt > $(BASEDIR)/requirements.txt

	$(PIP) install -r $(BASEDIR)/requirements-dev.txt

	$(NPM) install $(BASEDIR)

	$(BUNDLER) install

	$(PYTHON) setup.py install

	make clean

upgrade:
	python -c 'import pip; [pip.main(["install", "--upgrade", d.project_name]) for d in pip.get_installed_distributions()]'

	npm-check --update

build:
	$(PYTHON) -B -m builder


docs:
	cd $(DOCSDIR) && make html

kill:
	lsof -i TCP:$(SERVER_PORT) | grep LISTEN | awk '{print $2}' | xargs kill -9

sass:
	sass $(SOURCEDIR)/app/client/styles/App.scss:$(SOURCEDIR)/app/assets/css/styles.min.css --sourcemap=none --style compressed

run:
	npm start & $(PYTHON) -m $(PACKAGE)

loc:
	( find $(SOURCEDIR) -name "*.py"  -print0 | xargs -0 cat ) | wc -l
	( find $(SOURCEDIR) -name "*.jsx" -print0 | xargs -0 cat ) | wc -l

analyse:
	make loc

all:
	make clean install docs run

docker.build:
	docker build -t $(PACKAGE) $(BASEDIR)

start:
ifeq ($(ENVIRONMENT), development)
	$(HONCHO) start --procfile $(BASEDIR)/Procfile.dev
else
	$(HONCHO) start
endif