var express = require('express');
// var path = require('path');
// var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var connectMultiparty = require('connect-multiparty');
var expressSession = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(expressSession);
var app = express();
var port = process.env.PORT || 3001;


var dbUrl = 'mongodb://localhost/driver';
mongoose.connect(dbUrl);
// app.locals.moment = require('moment');

// app.use(serveStatic(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
// app.use(connectMultiparty());
app.use(expressSession({
    secret: 'driver',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))

if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(logger('dev'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}
app.set('views', './app/views');
app.set('view engine', 'jade');

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

require('./config/route')(app);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://localhost', host, port);
});
