const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const authRoutes = require('./routes/auth');  // Assuming auth.js is in a directory named routes
const User = require('./models/User');  // Assuming User.js is in a directory named models

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // update this to the location of your react app
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/nanahira-db1', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    const userInformation = {
      id: user._id,
      email: user.email,
    };
    cb(err, userInformation);
  });
});

app.use('/auth', authRoutes);  // use the auth routes

app.listen(4000, () => {
  console.log('Server started. Listening on port 4000.');
});
