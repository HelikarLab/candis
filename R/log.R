source('util/color.R')
source('util/is.R')

# Log Types
log.DEBUG   <<- FALSE
log.INFO    <-  'INFO'
log.SUCCESS <-  'SUCCESS'
log.WARN    <-  'WARN'
log.DANGER  <-  'DANGER'

#' log.format
#'
#' Generates a format string for a given tag and message.
#' @param string tag
#' @param string message
#' @param type type of log
#' @return string formatted log string
#' @examples
#' log.format('test.R', 'My Message', type = log.DANGER)
log.format  <- function (tag, message, type = NULL) {
  if ( !is.null(type) ) {
    if ( is.equal(type, log.INFO) ) {
      color <- color.INFO
    } else if ( is.equal(type, log.SUCCESS) ) {
      color <- color.SUCCESS
    } else if ( is.equal(type, log.WARN) ) {
      color <- color.WARNING
    } else if ( is.equal(type, log.DANGER) ) {
      color <- color.DANGER
    }

    tag     <- join(c(color, tag, color.RESET))
  }

  statement <- join(c(tag, ': ', message))

  return(statement)
}

log.output  <- function (string) {
  if ( is.true(log.DEBUG) ) {
    string  <- paste(paste('[', Sys.time(), ']', sep = ''), string)

    message(string)
  }
}

log.info    <- function (tag, message) {
  if ( is.true(log.DEBUG) ) {
    format  <- log.format(tag, message, type = log.INFO)

    log.output(format)
  }
}

log.success <- function (tag, message) {
  if ( is.true(log.DEBUG) ) {
    format  <- log.format(tag, message, type = log.SUCCESS)

    log.output(format)
  }
}

log.warn    <- function (tag, message) {
  if ( is.true(log.DEBUG) ) {
    format  <- log.format(tag, message, type = log.WARN)

    log.output(format)
  }
}

log.danger  <- function (tag, message) {
  if ( is.true(log.DEBUG) ) {
    format  <- log.format(tag, message, type = log.DANGER)

    log.output(format)
  }
}
