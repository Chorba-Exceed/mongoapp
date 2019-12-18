const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
  login: String,
  hash: String,
  salt: String,
},
{ versionKey: false });

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
  return jwt.sign({
    id: this._id,
    login: this.login,
  }, 'secret');
};

UsersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.hash;
  delete obj.salt;
  return obj;
};

const user = mongoose.model('Users', UsersSchema);

module.exports = user;
