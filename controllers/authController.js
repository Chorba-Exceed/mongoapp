const passport = require('passport');
const Users = require('../database/models/users');

function register(req, res, next) {
    const user = req.body;
    if (!user.login) {
        return res.status(422).json({ errors: 'Enter login' });
    }

    if (!user.password) {
        return res.status(422).json({ errors: 'Enter password' });
    }

    if (user.password !== user.passwordReplay) {
        return res.status(422).json({ errors: 'Enter password do not same' });
    }

    if (user.password.length < 6) {
        return res.status(422).json({ errors: 'Password must be more than 6 characters' })
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    finalUser.save()
        .then(() => res.json(finalUser))
        .catch((err) => next(err));
}

function login(req, res, next) {
    const user = req.body;

    if (!user.login) {
        return res.status(422).json({ errors: 'Enter login' });
    }

    if (!user.password) {
        return res.status(422).json({ errors: 'Enter password' });
    }

    return passport.authenticate('local', (err, passportUser, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                return res.json({ token: passportUser.generateJWT() });
            }

            return res.sendStatus(400);
        })(req, res, next);
}

module.exports = {
    register,
    login
};
