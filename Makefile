.PHONY: build
.PHONY: docs

PYTHON      ?= python
BASEDIR      = $(realpath .)
SOURCEDIR    = $(realpath candis)
DOCSDIR      = $(realpath docs)

SERVER_HOST  = 0.0.0.0
SERVER_PORT ?= 5000

install:
	cat requirements/*.txt          > requirements-dev.txt
	cat requirements/production.txt > requirements.txt

	pip install -r requirements.txt

	npm install .

build:
	$(PYTHON) -B -m builder

clean:
	rm -rf .sass-cache

	$(PYTHON) setup.py clean

	clear

docs:
	cd $(DOCSDIR) && make html

kill:
	fuser -k $(SERVER_PORT)/tcp

run:
	$(PYTHON) -m candis & npm start

loc:
	( find $(SOURCEDIR) -name "*.py"  -print0 | xargs -0 cat ) | wc -l
	( find $(SOURCEDIR) -name "*.jsx" -print0 | xargs -0 cat ) | wc -l

analyse:
	make loc

all:
	make clean install docs run
