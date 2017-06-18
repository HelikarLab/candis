<h1 align="center">
  <img src=".github/logo.png" width="512">
</h1>

<h4 align="center">
  A data mining suite for DNA microarrays
</h4>

<p align="center">
  <a href="https://saythanks.io/to/achillesrasquinha" target="_blank">
    <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
  </a>
  <a href="https://paypal.me/achillesrasquinha" target="_blank">
    <img src="https://img.shields.io/badge/Donate-%24-blue.svg">
  </a>
</p>

### Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Dependencies](#dependencies)
* [License](#license)

### Installation
Download or clone the repository as follows:
```console
$ git clone http://github.com/achillesrasquinha/candis.git && cd candis
```

Then, simply:
```console
$ make install
```

### Usage
**Launching the RIA (Rich Internet Application)**

via CLI
```
$ candis
```
OR
```
$ python -m candis
```

via Python
```python
>>> import candis
>>> candis.main()
```

![](.github/ria.gif)

### Dependencies
* Production Dependencies
  * Python 2.7+ or Python 3.5+
* Development Dependencies
  * [Node.js](https://nodejs.org)
  * [SASS](http://sass-lang.com)

### License
This software has been released under the [GNU General Public License v3](LICENSE).
