const mongoose = require('mongoose');
const passport = require('passport');
const authRouter = require("express").Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')

authRouter.post("/register",auth.optional, authController.register);
authRouter.post("/login",auth.optional, authController.login);

module.exports = authRouter;