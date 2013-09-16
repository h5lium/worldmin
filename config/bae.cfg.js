
var _ = require('underscore');

module.exports = function(config) {
	return _.extend(config, {
		env: 'production',
		port: process.APP_PORT || 80,
		mongo: {
			host: process.env.BAE_ENV_ADDR_MONGO_IP,
			port: process.env.BAE_ENV_ADDR_MONGO_PORT,
			username: process.env.BAE_ENV_AK,
			password: process.env.BAE_ENV_SK,
			name: 'NALuyxrPVMrigkTVgSuL'
		},
		secret: 'ddd',
		tmpDir: __dirname + '/../..'
	});
}
