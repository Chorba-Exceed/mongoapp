const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./src/routes/authRouter');
const mongoInit = require('./src/database/connectionDB');
const passport = require('./src/helpers/passport');
const { jwtAuth } = require('./src/middleware/auth');
const todosRouter = require('./src/routes/todosRouter');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
}));

app.use(bodyParser.json({
  limit: '5mb',
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, Content-Length, X-Requested-With');
  next();
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
