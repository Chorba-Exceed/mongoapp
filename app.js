const todosRouter = require('./routes/todosRouter');
const authRouter = require('./routes/authRouter');
const express = require("express");
const session = require('express-session');
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(session({ secret: 'admin', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use('/api/todoList', jsonParser, todosRouter);
app.use('/auth', jsonParser, authRouter);

require('./config/passport');
app.listen(3000, function () {
    console.log("Server started");
});