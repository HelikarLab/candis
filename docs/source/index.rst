candis
======
    🎀 *"A data mining suite for DNA microarrays."*

Release: v\ |version| (:ref:`Installation <installation>`)

.. image:: https://img.shields.io/badge/license-GNU%20GPL%20v3-blue.svg

**candis** is an Open Source data mining suite (released
under the GNU General Public License v3) for DNA microarrays that consists of
a wide collection of tools you require, right from Data Extraction to
Model Deployment.

**candis** helps you with

**Data Extraction**

Extracting data from National Center for Biotechnology Information's Entrez
engine using the :py:mod:`candis.entrez` API.

.. code:: python

    >>> from candis import entrez
    >>> api = entrez.API('<your_email_ID>')
    >>> api.info() # List of available databases from NCBI.
    ['pubmed', 'protein', 'nuccore', ...]

**candis** is created and currently maintained by `Achilles Rasquinha <https://github.com/achillesrasquinha>`_.

**candis** officially supports Python 2.7+ and 3.5+.

Guide - User
++++++++++++

.. toctree::
  :maxdepth: 2

  guides/user/introduction
  guides/user/installation
  guides/user/quickstart

Guide - API
+++++++++++

.. toctree::
  :maxdepth: 2

  guides/api/api
  guides/api/cli
  guides/api/ria
