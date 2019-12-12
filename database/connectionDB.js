const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/admin", { useNewUrlParser: true }, function () {
    console.log('Successfully connected DB');
});

module.exports = {
    mongoose,
    Schema
};