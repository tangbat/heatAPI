const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');

let opts =  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.userId);
          
      // If user doesn't exist, handle
      // Otherwise, return the user
      if(!user) {
          return done(null, false);
      }

      done(null, user);
    } catch(error) {
      done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      // Find the user given the username/email
      // var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
      var criteria = { email: username }; 
      const user = await User.findOne(criteria);

      // If not, handle it
      if (!user) {
        return done('User not found', false);
      }
    
      // Check is the user is activated
      if (!user.active) {
        return done('User not activated', false);
      }

      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);

      // If not, handle it
      if (!isMatch) {
        return done('Invalid Password');
      }
    
      // Otherwise, return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));