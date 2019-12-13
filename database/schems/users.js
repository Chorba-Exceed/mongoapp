const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {mongoose, Schema} = require("../connectionDB")

const UsersSchema = new Schema({
         login: String,
         hash: String,
         salt: String,
     },
    { versionKey: false }
);

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        login: this.login,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');

}

UsersSchema.methods.toAuthJSON = function() {
    return {
        token: this.generateJWT(),
    };
};

const user = mongoose.model('Users', UsersSchema);

module.exports = user;