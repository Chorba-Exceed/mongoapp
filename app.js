const apiRouter = require('./routes/api.router');
const authRouter = require('./routes/authRouter');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoInit = require('./database/connectionDB');
const passport = require('./helpers/passport');
const { PORT } = require('./properties');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
}));

app.use(bodyParser.json({
    limit: '5mb',
}));

app.use(passport.initialize());
app.use(authRouter);
app.use(apiRouter);

mongoInit()
    .then((db) => {
        app.listen(PORT, function () {
            console.log(`Server started on ${PORT}`);
        });
    })
    .catch(error => console.error(error));


