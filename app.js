const apiRouter = require('./routes/api.router');
const authRouter = require('./routes/authRouter');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoInit = require('./database/connectionDB');
const passport = require('./helpers/passport');

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
        app.listen(3000, function () {
            console.log(`Server started on 3000`);
        });
    })
    .catch(error => console.error(error));


