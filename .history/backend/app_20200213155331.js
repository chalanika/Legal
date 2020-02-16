var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); //
var compression = require('compression');

var indexRouter = require('./routes/index');  // 1F4lkl1r891A3syQ
var usersRouter = require('./routes/users'); // admin xFVgzsJmhA4hYTtK
var fileRoutes = require('./routes/file');
var categoryRouter = require('./routes/categories');
var caseRouter = require('./routes/cases');
var appointmentRouter = require('./routes/appointments');
var notificationRouter = require('./routes/notification');


// var imageRoutes = require();

var cors= require('cors');
var app = express();

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));

// var dir = path.join(__dirname, 'public');
// app.use(express.static(dir));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// const { static } = require('express');
// app.use('/images/', static('../uploads/'));

var mongoose =require('mongoose');


// mongoose.connect('mongodb+srv://Admin:FqQRPlcPOtxMxafu@legal-vyrsv.mongodb.net/Legal?retryWrites=true&w=majority',{ useNewUrlParser: true }).then(()=>console.log("connect successfully"))

// .catch((err)=>console.error(err));

mongoose.connect('mongodb+srv://Admin:FqQRPlcPOtxMxafu@legal-vyrsv.mongodb.net/Legal?retryWrites=true&w=majority',{ useNewUrlParser: true }).then(()=>console.log("connect successfully"))
.catch((err)=>console.error(err));
 
// mongoose.connect('mongodb://localhost/easycase',{ useNewUrlParser: true , useCreateIndex: true , useFindAndModify: false })
// .then(() => console.log('DB connection successfull'));

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
app.use(compression());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileRoutes);
app.use('/category', categoryRouter);
app.use('/case', caseRouter);
app.use('/appointment',appointmentRouter);
app.use('/appointment',appointmentRouter);
app.use('/appointment',appointmentRouter);


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
// ignore favicon
function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

app.use(ignoreFavicon);

// app.use(express.static('uploads')); not working

// app.listen(3000, ()=>console.log("server started"));

module.exports = app;
