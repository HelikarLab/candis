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

upgrade:
	python -c 'import pip; [pip.main(["install", "--upgrade", d.project_name]) for d in pip.get_installed_distributions()]'

	npm-check --update

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
