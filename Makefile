.PHONY: build
.PHONY: docs

PYTHON      ?= python
BASEDIR      = $(realpath .)
PACKAGE      = candis
SOURCEDIR    = $(realpath $(PACKAGE))
DOCSDIR      = $(realpath docs)

SERVER_HOST  = 0.0.0.0
SERVER_PORT ?= 5000

install:
	cat requirements/*.txt          > requirements-dev.txt
	cat requirements/production.txt > requirements.txt

	pip install -r requirements-dev.txt

	npm install .

	bundler install

build:
	$(PYTHON) -B -m builder

clean-force:
	rm -rf node_modules bower_components
	rm -rf $(DOCSDIR)/build

	make clean

clean:
	rm -rf .sass-cache

	$(PYTHON) setup.py clean

	clear

docs:
	cd $(DOCSDIR) && make html

kill:
	fuser -k $(SERVER_PORT)/tcp

sass:
	sass $(SOURCEDIR)/app/client/styles/App.scss:$(SOURCEDIR)/app/assets/css/styles.min.css --sourcemap=none --style compressed

run:
	$(PYTHON) -m $(PACKAGE) & npm start

loc:
	( find $(SOURCEDIR) -name "*.py"  -print0 | xargs -0 cat ) | wc -l
	( find $(SOURCEDIR) -name "*.jsx" -print0 | xargs -0 cat ) | wc -l

analyse:
	make loc

all:
	make clean install docs run
