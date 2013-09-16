
var request = require('request'),
	_ = require('../lib/mylib')(require('underscore')),
	config = require('../config/')('local'),
	wxParser = require('../lib/weixin-router/parser.wx');

request({
	method: 'POST',
	uri: 'http://localhost:'+ config.port + config.wxPath,
	body: wxParser.toXml({
		toUserName: 'aaa',
		fromUserName: 'ccc',
		createTime: _.getDate().getTime(),
		msgType: 'text',
		content: 'wo cao~'
	})
}, function(err, res, resXml) {
	console.log(wxParser.toObj(resXml));
});
