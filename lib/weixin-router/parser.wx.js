
var domino = require('domino'),
	Zepto = require('zepto-node'),
	window = domino.createWindow(),
	$ = Zepto(window);

exports.toXml = function(resObj) {
	// TODO: use Array.prototype.join()
	var xml;
	if (resObj.msgType === 'text') {
		xml = '\
<xml>\
	<ToUserName><![CDATA['+ resObj.toUserName +']]></ToUserName>\
	<FromUserName><![CDATA['+ resObj.fromUserName +']]></FromUserName>\
	<CreateTime>'+ resObj.createTime +'</CreateTime>\
	<MsgType><![CDATA['+ resObj.msgType +']]></MsgType>\
	<Content><![CDATA['+ resObj.content +']]></Content>\
	'+ (resObj.msgId ? ('<MsgId><![CDATA['+ resObj.msgId +']]></MsgId>') : '') +'\
</xml>\
		';
	} else if (resObj.msgType === 'music') {
		xml = '\
<xml>\
	<ToUserName><![CDATA['+ resObj.toUserName +']]></ToUserName>\
	<FromUserName><![CDATA['+ resObj.fromUserName +']]></FromUserName>\
	<CreateTime>'+ resObj.createTime +'</CreateTime>\
	<MsgType><![CDATA['+ resObj.msgType +']]></MsgType>\
	<Music>\
		<Title>'+ resObj.title +'</Title>\
		<Description>'+ resObj.description +'</Description>\
		<MusicUrl>'+ resObj.musicUrl +'</MusicUrl>\
		<HQMusicUrl>'+ resObj.hqMusicUrl +'</HQMusicUrl>\
	</Music>\
</xml>\
		';
	} else if (resObj.msgType === 'news') {
		// TODO: now support only one
		xml = '\
<xml>\
	<ToUserName><![CDATA['+ resObj.toUserName +']]></ToUserName>\
	<FromUserName><![CDATA['+ resObj.fromUserName +']]></FromUserName>\
	<CreateTime>'+ resObj.createTime +'</CreateTime>\
	<MsgType><![CDATA['+ resObj.msgType +']]></MsgType>\
	<ArticleCount>1</ArticleCount>\
	<Articles>\
		<item>\
			<Title><![CDATA['+ resObj.article.title +']]></Title> \
			<Description><![CDATA['+ resObj.article.description +']]></Description>\
			<PicUrl><![CDATA['+ resObj.article.picUrl +']]></PicUrl>\
			<Url><![CDATA['+ resObj.article.url +']]></Url>\
		</item>\
	</Articles>\
</xml>\
 		';
	}
	return xml;
}
exports.toObj = function(reqXml) {
	var $req = $('<div>').html(reqXml),
	reqObj = {
		toUserName: getCData($req.find('ToUserName').html()),
		fromUserName: getCData($req.find('FromUserName').html()),
		createTime: $req.find('CreateTime').html(),
		msgType: getCData($req.find('MsgType').html()),
		msgId: $req.find('MsgId').html()
	}
	if (reqObj.msgType === 'text') {
		reqObj.content = getCData($req.find('Content').html());
	} else if (reqObj.msgType === 'image') {
		reqObj.picUrl = getCData($req.find('PicUrl').html());
	} else if (reqObj.msgType === 'location') {
		reqObj.locationX = Number($req.find('Location_X').html());
		reqObj.locationY = Number($req.find('Location_Y').html());
		reqObj.scale = Number($req.find('Scale').html());
		reqObj.label = getCData($req.find('Label').html());
	} else if (reqObj.msgType === 'link') {
		reqObj.title = getCData($req.find('Title').html());
		reqObj.description = getCData($req.find('Description').html());
		reqObj.url = getCData($req.find('Url').html());
	} else if (reqObj.msgType === 'event') {
		reqObj.event = getCData($req.find('Event').html());
		reqObj.eventKey = getCData($req.find('EventKey').html());
	}
	return reqObj;
}

function getCData(str){
	return str ? str.substring(11, str.length - 5) : '';
}
