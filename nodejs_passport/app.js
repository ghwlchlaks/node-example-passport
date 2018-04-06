var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var mongoose = require('mongoose')
var cors = require('cors')
var session =require('express-session')

var dbconfig = require('./config/database')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


/*
mongoose.connect(dbconfig.social_collection)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function (callback) {
  console.log('mongo db connected..')
})
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  cookie: {expires: new Date(Date.now() + (60 * 60 * 1000))}
 }))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./policies/FBauthenticationManager')(passport)
require('./policies/GoogleauthenticationManager')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', index);
app.use('/users', users);

app.use('/profile',index)

app.use('/login/facebook',index)
app.use('/login/facebook/callback', index)
app.use('/login/google',index)
app.use('/login/google/callback', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.PORT || 80, '0.0.0.0')
module.exports = app;
