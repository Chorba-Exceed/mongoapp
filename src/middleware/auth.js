const passport = require('../helpers/passport');
const { setErrorResponse } = require('../helpers/helpers');

exports.jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send(
        setErrorResponse(401, 'Token is not provided or invalid'),
      );
    }

    req.user = user;
    return next();
  })(req, res, next);
};
