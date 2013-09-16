
var _ = require('underscore');

module.exports = function(config) {
	return _.extend(config, {
		timezoneOffset: 8,
		publicDir: __dirname + '/../public',
		wxToken: 'min',
		wxPath: '/wx'
	});
}
