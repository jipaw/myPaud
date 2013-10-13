
/**
 * Module dependencies.
 */
'use strict';

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'super-duper-secret-secret' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, './server/public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./router')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

