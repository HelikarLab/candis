source('constant.R')
source('log.R')
source('util/util.R')

log.DEBUG <<- DEBUG

log.info('setup', 'Installing Bioconductor')
source('http://bioconductor.org/biocLite.R')

log.info('setup', paste('Installing Bioconductor Packages:', join(BIOCONDUCTOR_PACKAGES, ', ')))
biocLite(BIOCONDUCTOR_PACKAGES)