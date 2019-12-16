const mongoose = require("mongoose");

module.exports = function () {
  return mongoose.connect("mongodb://localhost:27017/mongoapp_db", { useNewUrlParser: true, useUnifiedTopology: true  });
};
