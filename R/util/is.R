is.equal       <- function (x, y) {
 	evaluation <- x == y

 	return(evaluation)
}

is.true        <- function (x) {
 	evaluation <- is.equal(x, TRUE)

 	return(evaluation)
}