module.exports = {
	"verbose" : true,
	"collectCoverage" : true,
	"roots" : ["candis/app/client/app"], 
	"collectCoverageFrom" : [
		"**/*.{js,jsx}",
		"!**/node_modules/**",
		"!**/vendor/**"
	],
	"setupFiles" : [
		"<rootDir>/candis/app/client/app/tests/setupTests.js"
	] 
}
