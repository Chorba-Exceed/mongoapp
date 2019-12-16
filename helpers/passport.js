const passport = require('passport');
const Users = require('../database/models/users');
const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
},  async (login, password, done) => {
    try {
        const user = await Users.findOne({login}).exec();
        if (user && user.validatePassword(password)) {
            done(null, user);
        }
        return done(null, false);
    } catch (err) {
        done(err);
    }
}));
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
};

passport.use(new Strategy(jwtOptions,
    async (payload, done) => {
        try {
            const user = await Users.findById(payload.id).exec();
            done(null, user || false);
        } catch (err) {
            done(err);
        }
    }),
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await Users.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
