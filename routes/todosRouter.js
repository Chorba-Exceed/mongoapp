const express = require("express");
const userController = require("../controllers/todoController");
const todosRouter = express.Router();
const itemBodyValidation = require("../middleware/validators");

todosRouter.get("/items", userController.getItem);
todosRouter.post("/item", itemBodyValidation, userController.createItem);
todosRouter.get("/item/:id", userController.getItemByID);
todosRouter.delete("/item/:id", userController.deleteItemById);
todosRouter.put("/item/:id", itemBodyValidation, userController.updateItemByID);

module.exports = todosRouter;
