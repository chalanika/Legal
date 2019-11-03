var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); //

var indexRouter = require('./routes/index');  // 1F4lkl1r891A3syQ
var usersRouter = require('./routes/users'); // admin xFVgzsJmhA4hYTtK
var fileRoutes = require('./routes/file');

var cors= require('cors');
var app = express();

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));

var mongoose =require('mongoose');


mongoose.connect('mongodb+srv://Admin:FqQRPlcPOtxMxafu@legal-vyrsv.mongodb.net/Legal?retryWrites=true&w=majority',{ useNewUrlParser: true }).then(()=>console.log("connect successfully"))

.catch((err)=>console.error(err));


//passport
var passport = require('passport');
var session = require('express-session');   
const MongoStore = require('connect-mongo')(session);
app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: false })); //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileRoutes);

//rating form

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// app.listen(3000, ()=>console.log("server started"));

module.exports = app;
