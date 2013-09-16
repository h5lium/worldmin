
module.exports = function(_) {
	_.getDate = function(timezoneOffset) {
		var now = new Date(), ofs = now.getTimezoneOffset();
		return new Date(now.getTime() + (timezoneOffset - ofs) * 3600000);
	}
	return _;
}
