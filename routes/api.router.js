const { Router } = require('express');
const todoRouter = require('./todosRouter');
const { jwtAuth } = require('../middleware/auth');

const apiRouter = Router();

apiRouter.use('/api', jwtAuth, todoRouter);

module.exports = apiRouter;


