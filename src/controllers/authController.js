const passport = require('passport');
const Users = require('../database/models/users');
const { setErrorResponse } = require('../helpers/helpers');

async function register(req, res) {
  try {
    const user = req.body;
    if (!user.login) {
      return res.status(422).send(
        setErrorResponse(422, 'Enter login'),
      );
    }

    if (!user.password) {
      return res.status(422).send(
        setErrorResponse(422, 'Enter password'),
      );
    }

    if (user.password !== user.passwordReplay) {
      return res.status(422).send(
        setErrorResponse(422, 'Enter password do not same'),
      );
    }

    if (user.password.length < 6) {
      return res.status(422).send(
        setErrorResponse(422, 'Password must be more than 6 characters'),
      );
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return passport.authenticate('local', (err, passportUser) => {
      if (passportUser) {
        return res.json({ token: passportUser.generateJWT() });
      }
      return res.status(401).send(
          setErrorResponse(401, 'Invalid login or password'),
      );
    })(req, res);
  } catch (e) {
    return res.status(500).send(
      setErrorResponse(500, 'Server error'),
    );
  }
}

function login(req, res) {
  const user = req.body;

  if (!user.login) {
    return res.status(422).json({ errors: 'Enter login' });
  }

  if (!user.password) {
    return res.status(422).json({ errors: 'Enter password' });
  }

  return passport.authenticate('local', (err, passportUser) => {
    if (passportUser) {
      return res.json({ token: passportUser.generateJWT() });
    }
    return res.status(401).send(
        setErrorResponse(401, 'Invalid login or password'),
    );
  })(req, res);
}

module.exports = {
  register,
  login,
};
