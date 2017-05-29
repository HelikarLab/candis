.PHONY: docs

PYTHON   ?= python
BASEDIR   = $(realpath .)
SOURCEDIR = $(realpath candis)
DOCSDIR   = $(realpath docs)

HOST      = 0.0.0.0
PORT     ?= 5000

install:
	cat requirements/*.txt > requirements.txt

	pip install -r requirements.txt

	npm install .

clean:
	find $(BASEDIR) | grep -E "__pycache__" | xargs rm -rf

	rm -rf .sass-cache

	clear

docs:
	cd $(DOCSDIR) && make html

kill:
	fuser -k $(PORT)/tcp

run:
	make kill

	$(PYTHON) -B -m candis & $(PYTHON) -B -m build & npm start

loc:
	( find $(SOURCEDIR) -name "*.py" -print0 | xargs -0 cat ) | wc -l

analyse:
	# flake8 $(SOURCEDIR)

	make loc

all:
	make clean install docs run
