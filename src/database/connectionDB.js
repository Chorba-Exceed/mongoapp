const mongoose = require('mongoose');

module.exports = function () {
  if (process.env.NODE_ENV === 'test') {
    console.log('Connect on TEST DB');
    return mongoose.connect('mongodb://localhost:27017/mongoapp_db_test', { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return mongoose.connect('mongodb://localhost:27017/mongoapp_db', { useNewUrlParser: true, useUnifiedTopology: true });
};
