const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./src/routes/authRouter');
const mongoInit = require('./src/database/connectionDB');
const passport = require('./src/helpers/passport');
const { jwtAuth } = require('./src/middleware/auth');
const todosRouter = require('./src/routes/todosRouter');

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
}));

app.use(bodyParser.json({
  limit: '5mb',
}));

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    res.header('Access-Control-Allow-Credentials', true);

    // intercept OPTIONS method
    if (oneof && req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.use(passport.initialize());
app.use(authRouter);
app.use(jwtAuth);
app.use('/api', todosRouter);

mongoInit()
  .then(() => {
    app.listen(port, () => {
      console.log('Server started on 3000');
    });
  })
  .catch((error) => console.error(error));

module.exports = app;
