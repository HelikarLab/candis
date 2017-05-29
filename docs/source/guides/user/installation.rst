.. _installation:

Installation
============

Building from source
++++++++++++++++++++

**candis** is actively developed on GitHub_ and is always avaliable.

.. _GitHub: https://github.com/achillesrasquinha/candis

You can clone the base repository with :code:`git` as follows:

.. code-block:: console

    $ git clone git@github.com:achillesrasquinha/candis.git

Optionally, you could download the tarball_ or zipball_ as follows:

.. _tarball: https://github.com/achillesrasquinha/tarball/candis
.. _zipball: https://github.com/achillesrasquinha/zipball/candis

**For Linux Users**

.. code-block:: console

	$ curl -OL https://github.com/achillesrasquinha/tarball/candis

**For Windows Users**

.. code-block:: console

	$ curl -OL https://github.com/achillesrasquinha/zipball/candis

Install necessary dependencies

.. code-block:: console

    $ pip install -r requirements.txt

Then, go ahead and install **candis** in your site-packages  as follows:

.. code-block:: console

    $ python setup.py install

Check to see if you've installed **candis** correctly.

.. code-block:: python

	>>> import candis
