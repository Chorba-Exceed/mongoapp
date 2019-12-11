const todosRouter = require('./routes/todosRouter');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use('/api/todoList', jsonParser, todosRouter);

app.listen(3000, function () {
    console.log("Server started");
});