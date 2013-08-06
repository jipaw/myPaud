
/**
 * Module dependencies.
 */
//use strict

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('kooBkooCedoN'));
app.use(express.session());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);

app.get('/admin', function(req, res){
  res.render('admin.jade');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function (req, res) {
  var post = req.body;
  if (post.username == 'admin' && post.password == 'admin') {
    res.redirect('admin');
  } else {
    console.log('username/password salah');
    res.send('Bad user/pass');
  }
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

