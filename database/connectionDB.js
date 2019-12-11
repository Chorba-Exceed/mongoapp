const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/admin", { useNewUrlParser: true }, function () {
    console.log('Successfully connected');
});
const Schema = mongoose.Schema;
const todoScheme = new Schema({
        description: String,
        complete: Boolean
    },
    { versionKey: false }
);
const Todo = mongoose.model("todo", todoScheme);

module.exports = Todo;