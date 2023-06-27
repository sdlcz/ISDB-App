const passport = require('passport');
const passportJwt = require('passport-jwt');
const { User } = require('../models/users');

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'a@s!k#',
};

const strategy = new passportJwt.Strategy(jwtOptions, (jwtPayload, next) => {
  User.findOne({ username: jwtPayload.username }, (error, user) => {
    if (error) { next(null, false); } else { next(null, user); }
  });
});

passport.use(strategy);
passport.use(User.createStrategy());
