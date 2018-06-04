module.exports = {
	"verbose" : true,
	"collectCoverage" : true,
	"roots" : ["candis/app/client/app"], 
	"collectCoverageFrom" : [
		"**/*.{js,jsx}",
		"!**/node_modules/**",
		"!**/vendor/**",
		"!**/app/tests/**",
	],
	"setupFiles" : [
		"<rootDir>/candis/app/client/app/tests/setupTests.js"
	] 
}
