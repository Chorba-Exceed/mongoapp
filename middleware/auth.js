const passport = require('../helpers/passport');
const {setErrorResponse} = require('../helpers/helpers');

exports.jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', function (err, user) {
        if (err) {
            console.log(11)
            return next(err);
        }

        if (!user) {
            return res.status(401).send(
                setErrorResponse(401, 'Token is not provided or invalid')
            )
        }

        req.user = user;
        next();
    })(req, res, next);
};
