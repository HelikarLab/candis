source('constant.R')
source('log.R')
source('util/util.R')

log.DEBUG <<- DEBUG

log.info('setup', 'Installing Bioconductor')
if (!requireNamespace("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

log.info('setup', paste('Installing Bioconductor Packages:', join(BIOCONDUCTOR_PACKAGES, ', ')))
BiocManager::install(BIOCONDUCTOR_PACKAGES)