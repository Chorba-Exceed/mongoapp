const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../database/models/users');

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
}, async (login, password, done) => {
  try {
    const user = await Users.findOne({ login });
    if (user && user.validatePassword(password)) {
      done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
}));
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(new Strategy(jwtOptions,
  async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      done(null, user || false);
    } catch (err) {
      done(err);
    }
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
