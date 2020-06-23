var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// API
app.use('/api/intravan', require('./api/intravan'));
app.use('/api/intravanpkg', require('./api/intravanpkg'));
app.use('/api/intravanHist', require('./api/intravanHist'));
app.use('/api/iparts', require('./api/iparts'));
app.use('/api/smartlink', require('./api/smartlink'));
app.use('/api/translate', require('./api/translate'));

// Server
/*var port = 8085;  운영 */
var port = 8086; /* 개발 */
app.listen(port, function(){
  console.log('listening on port:' + port);
});
