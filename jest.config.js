module.exports = {
	"verbose" : true,
	"collectCoverage" : true,
	"roots" : ["src/candis/app/client/app"],
	"collectCoverageFrom" : [
		"**/*.{js,jsx}",
		"!**/node_modules/**",
		"!**/vendor/**",
		"!**/app/tests/**",
	],
	"setupFiles" : [
		"<rootDir>/src/candis/app/client/app/tests/setupTests.js"
	]
}
