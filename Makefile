PYTHON    = python
BASEDIR   = $(realpath .)
SOURCEDIR = $(realpath candis)

install:
	cat requirements/*.txt > requirements.txt

	pip install -r requirements.txt

loc:
	find $(SOURCEDIR) -name '*.py' | xargs wc -l

clean:
	find $(BASEDIR) | grep -E "__pycache__" | xargs rm -rf

	clear

gui:
	$(PYTHON) -B -c 'import candis; candis.app.main();'

all:
	make clean install
