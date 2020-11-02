var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const routerAPI = require('./routes/API');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//REQUIRE JWT
const jwt = require('jsonwebtoken');

//IMPORT USERCONTROLLER
const userController = require('./controllers/userController');

//REQUIRE bcrypt
const bcrypt = require('bcryptjs');

//PASSPORT
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//REQUIRE MONGOOSE
const mongoose = require('mongoose');

//URL AND PORT
const DB_URL = process.env.DB_URL

//REQUIRE USERMODEL
const User = require('./models/User');
const router = require('./routes/API');
//INIT MONGOOSE CONNECTION
try {
  mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  console.log('CONNECTION SUCCESS');
} catch (err) {
  console.log(err)
};


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',passport.authenticate('jwt', {session: false}), usersRouter);

app.use(passport.initialize());



//PASSPORT CONFIG
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            return done(null,user);
            
          } else {
            return done(null,false, { message: 'Incorrect password.' })
          }
      })
    });
  }
));




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// PASSPORT JWT

let opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = 'authkey';

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload.userID}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
}));


//API ROUTER
app.use('/API', routerAPI);


app.post('/login', passport.authenticate(`local`),
  async (req,res) => {
    const userObject = await User.findOne({username: req.body.username});
    const userID = userObject._id
    const token = jwt.sign({userID}, 'authkey');
    res.status(200).json(token)
  }
)

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
