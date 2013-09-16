
var _ = require('underscore');

module.exports = function(config) {
	return _.extend(config, {
		env: 'development',
		port: 3333,
		mongo: {
			host: 'localhost',
			port: 27017,
			name: 'worldmin'
		},
		secret: 'abc',
		tmpDir: config.rootDir + '/tmp'
	});
}
