
var _ = require('underscore');

module.exports = function(config) {
	return _.extend(config, {
		timezoneOffset: 8,
		staticDir: __dirname + '/../static',
		wxToken: 'min',
		wxPath: '/wx'
	});
}
