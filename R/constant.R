# General Environment Variables
BIOCONDUCTOR_PACKAGES <<- readLines('assets/bioconductor-packages.txt')

DEBUG                 <<- Sys.getenv('CANDIS_DEBUG', TRUE)
