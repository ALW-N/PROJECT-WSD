var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

var basicAuth = require('./helper/basic-auth');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var ajaxRouter = require('./routes/ajaxRouter');
var adminRouter = require('./routes/adminRouter');
var postRouter = require('./routes/postRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: '57a638713eff2654b9ba80e6fd9a19e5',
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser('57a638713eff2654b9ba80e6fd9a19e5'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

try {
mongoose.connect("mongodb+srv://WSDPRO:WSDPRO@cluster0.0lnirja.mongodb.net/?retryWrites=true&w=majority" ,
{useNewUrlParser : true ,
},
()=> console.log("Mongoose is connected"),);
} catch(e){
  console.log("culd not connet")
  console.log(e)
}


app.use('/static', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/ajax', isloged, ajaxRouter);
app.use('/admin', basicAuth, adminRouter);
app.use('/user', userRouter);
app.use('/internships', postRouter);





function isloged(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
        res.redirect('/user/login');
    }
  }


module.exports = app;
