
var http = require('http'),
	assert = require('assert'),
	express = require('express'),
	_ = require('./lib/mylib')(require('underscore')),
	mkdirp = require('mkdirp'),
	mongoInit = require('./lib/mongo-init'),
	config = require('./config/')('local'),
	app = express(),
	wxRouter = require('./lib/weixin-router/');

app.configure(function() {
	app.set('env', config.env);
	mkdirp.sync(config.tmpDir);
	
	app.use(require('./lib/rawbody'));
	app.use(express.favicon());
	app.use(express.bodyParser({uploadDir: config.uploadDir}));
	app.use(express.cookieParser());
	app.use(express.session({secret: config.secret}));
	app.use(express.static(config.staticDir));
});
app.configure('development', function() {
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

mongoInit(config.mongo, function(err, db) {
	assert(db, 'Mongo init error!');
	app.configure(function() {
		app.set('db', db);
	});
	
	wxRouter(app, config);
	http.createServer(app).listen(config.port, function() {
		console.log('server listening on', config.port);
	});
});
