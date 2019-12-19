const mongoose = require('mongoose');

module.exports = function () {
  if (process.env.NODE_ENV === 'test') {
    console.log('Connect on TEST DB');
    return mongoose.connect('mongodb://localhost:27017/mongoapp_db_test', { useNewUrlParser: true, useUnifiedTopology: true });
  }
  console.log('DB connect success');
  return mongoose.connect('mongodb+srv://vitaliy:vitaliy@cluster0-bkoze.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB', { useNewUrlParser: true, useUnifiedTopology: true });
};
