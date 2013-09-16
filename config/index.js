
var fs = require('fs'),
	assert = require('assert');

module.exports = function(mode) {
	var file = __dirname + '/' + mode + '.cfg.js',
		exists = fs.existsSync(file);
	assert(exists, 'Config file not found!');
	return require(file)(require('./common.cfg')({}));
}
