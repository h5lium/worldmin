
var crypto = require('crypto');

module.exports = function(token) {
	return function(req, res){
		var echoStr = req.query['echostr'];
		if (checkSignature(req, token)) {
			res.end(echoStr);
		} else {
			res.end();
		}
	}
}

function checkSignature(req, token){
	var signature = req.query['signature']
		, timestamp = req.query['timestamp']
		, nonce = req.query['nonce'];
	
	tmpArr = [token, timestamp, nonce];
	tmpArr.sort();
	var tmpStr = tmpArr.join('');
	tmpStr = sha1( tmpStr );
	
	return tmpStr === signature;
}
function sha1(str){
	var shasum = crypto.createHash('sha1');
	shasum.update(str);
	return shasum.digest('hex');
}
