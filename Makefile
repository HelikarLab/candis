include .env

.PHONY: build
.PHONY: docs

BASEDIR      = $(realpath .)
MODULE       = candis
SOURCEDIR    = $(realpath $(MODULE))
DOCSDIR      = $(realpath docs)

VIRTUALENV   = virtualenv
PYTHON       = $(PYBINARIES)/python
PIP          = $(PYBINARIES)/pip
HONCHO       = $(PYBINARIES)/honcho
TWINE        = $(PYBINARIES)/twine

NPM         ?= npm
BUNDLER     ?= bundler

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

	$(PIP) install numpy
	$(PIP) install -r $(BASEDIR)/requirements-dev.txt

	$(NPM) install $(BASEDIR)

	$(BUNDLER) install

	$(PYTHON) setup.py install

	make clean

build:
	$(PYTHON) -B -m builder

docs:
	cd $(DOCSDIR) && make html

sass:
	sass $(SOURCEDIR)/app/client/styles/App.scss:$(SOURCEDIR)/app/assets/css/styles.min.css \
		--sourcemap=none 																	\
		--style=compressed

docker.build:
	docker build -t $(PACKAGE) $(BASEDIR)

start:
ifeq ($(ENVIRONMENT), development)
	$(HONCHO) start --procfile $(BASEDIR)/Procfile.dev
else
	$(HONCHO) start
endif

publish:
	$(PYTHON) setup.py sdist bdist_wheel

	$(TWINE) upload -r $(repo) $(BASEDIR)/dist/*

	make clean