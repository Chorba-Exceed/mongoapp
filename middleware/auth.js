const passport = require('../helpers/passport');

exports.jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.sendStatus ? res.sendStatus(401) : next(401);
        }

        req.user = user;
        next();
    })(req, res, next);
};
