const express = require('express');
const userController = require('../controllers/todoController');

const todosRouter = express.Router();
const validateUpdateItemData = require('../middleware/validators');

todosRouter.get('/items', userController.getItems);
todosRouter.post('/item', userController.createItem);
todosRouter.get('/item/:id', userController.getItemByID);
todosRouter.delete('/item/:id', userController.deleteItemById);
todosRouter.put('/item/:id', validateUpdateItemData, userController.updateItemByID);
todosRouter.delete('/items/deleteCompleted', userController.deleteCompleted);


module.exports = todosRouter;
