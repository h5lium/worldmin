
var _ = require('underscore');

module.exports = function(config) {
	var rootDir = __dirname + '/..';
	return _.extend(config, {
		timezoneOffset: 8,
		rootDir: rootDir,
		staticDir: rootDir + '/static',
		wxToken: 'min',
		wxPath: '/wx'
	});
}
