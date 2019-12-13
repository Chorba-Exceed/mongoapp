const passport = require('passport');
const Users = require('../database/schems/users');

function register(req, res) {
    const user = req.body;
    if (!user.login) {
        return res.status(422).json({errors: 'Enter login'});
    }
    if (!user.password) {
        return res.status(422).json({errors: 'Enter password'});
    }
    if (user.password !== user.passwordReplay) {
        return res.status(422).json({errors: 'Enter password do not same'});
    }
    if (user.password.length < 6) {
        return res.status(422).json({errors: 'Password must be more than 6 characters'})
    }
    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json(finalUser.toAuthJSON()));
};

function login(req, res, next) {
    const user = req.body;
    if (!user.login) {
        return res.status(422).json({errors: 'Enter login'});
    }
    if (!user.password) {
        return res.status(422).json({errors: 'Enter password'});
    }
    return passport.authenticate('local',
        { session: false },
        (err, passportUser, info) => {
            if(err) {
                return next(err);
            }

            if(passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return res.json({ user: user.toAuthJSON() });
            }

            return res.status(400).send();
        })(req, res, next);
}

module.exports = {
    register,
    login
};