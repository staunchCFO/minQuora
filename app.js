/** 
  * Program : A multi-page Node , Express , and Mongodb Powered 
              Software As A Service for managing online exam.
  *	@param[Object ] App is returned from this file 
  * Require important dependencies 
*/  
const express = require('express') 
const logger  = require('morgan') 
const path    = require('path')
const cookieParser = require('cookie-parser')
const createError  = require('http-errors') 
const session      = require('express-session') 
const multer       = require('multer') 
const fs           = require('fs')
const dotenv       = require('dotenv').config()
const bcrypt       = require('bcryptjs') 
const mongoose     = require('mongoose')
const CONFIG       = require('./config')
const flash        = require('connect-flash')
const MongoDBStore = require('connect-mongodb-session')(session)

/** 
  * Require the main routing file for the application 
  *
*/
const store = new MongoDBStore({
  uri : "mongodb+srv://staunchCFO:emeka1234@cluster0-keat9.mongodb.net/minquora?retryWrites=true&w=majority" 
})
var indexRouter = require('./routes/articles')

var app = express()

//! view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//! Express Session Middleware 
app.use(session({
	cookie : {
		maxAge : 6000000
	} , 
	secret : process.env.SESSION_SECRET , 
	resave : true , 
	saveUninitialized : true , 
	unset : "destroy" , 
	store : store , 
	genid : (req) => {
		return req.url
	}
	
}))

//Express MEssages MiddleWare 
app.use(require('connect-flash')());
app.use(function(req , res , next){
  res.locals.messages = require('express-messages')(req , res);
  next();
});

//require('./config/passport')(passport);

app.get('*' , function(req , res , next) {
  res.locals.customer = req.customer || null;
  next();
});



// app.use(passport.initialize());
// app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


/** 
  * Connection to the database 
*/

mongoose.connect(CONFIG.URL , CONFIG.OPTIONS) 

let db = mongoose.connection 
db.on('error' , console.error.bind(console , 'MongoDB connection error'))
db.on('open' , console.info.bind(console , 'Connection was ok'))

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

module.exports = app;
