
seajs.config({
	base: './sea-modules/',
	alias: {
		'main': 'worldmin/0.0.1/main'
	}
});

seajs.use('main');
