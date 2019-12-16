const passport = require('passport');
const Users = require('../database/models/users');
const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
}, (login, password, done) => {
    Users.findOne({ login })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: 'login is invalid' });
            }

            return done(null, user);
        }).catch(done);
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
        } catch (e) {
            done(e);
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
    } catch (e) {
        done(e);
    }
});

module.exports = passport;
