
var _ = require('../mylib')(require('underscore')),
	wxParser = require('./parser.wx');

module.exports = function(app, config) {
	var timezoneOffset = config.timezoneOffset,
		wxPath = config.wxPath,
		wxValid = require('./valid.wx')(config.wxToken);
	
	app.get(wxPath, function(req, res, next) {
		req.query['echostr'] ? wxValid(req, res) : next();
	});
	app.post(wxPath, function(req, res, next) {
		var reqObj = wxParser.toObj(req.rawBody),
		resXml = wxParser.toXml({
			toUserName: reqObj.fromUserName,
			fromUserName: reqObj.toUserName,
			createTime: _.getDate(timezoneOffset).getTime(),
			msgType: 'text',
			content: 'reply: ' + reqObj.content
		});
		res.send(resXml);
	});
}

