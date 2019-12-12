const passport = require('passport');
const Users = require('../database/schems/users')

function register(req, res){
    const { body: { user } } = req;

    if(!user.login) {
        return res.status(422).json({
            errors: {
                login: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
}

function login(req, res, next) {
    const { body: { user } } = req;
    if(!user.login) {
        return res.status(422).json({
            errors: {
                login: 'is required',
            },
        });
    }
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
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
            return status(400).info;
        })(req, res, next);
}

module.exports = {
    register,
    login
};