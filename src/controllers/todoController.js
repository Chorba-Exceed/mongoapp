const { setErrorResponse, setUpFieldsToUpdate } = require('../helpers/helpers');
const hasPermissions = require('../helpers/Permissions');
const Todo = require('../database/models/todo');


async function getItems(req, res) {
  try {
    const todos = await Todo.find({ author: req.user._id });
    return res.send(todos);
  } catch (err) {
    return res.status(500).send(
      setErrorResponse(500, 'Internal server error'),
    );
  }
}

async function createItem(req, res) {
  try {
    let item = req.body;
    item.author = req.user._id;
    item = await Todo.create(item);
    return res.send(item);
  } catch (err) {
    return res.status(500).send(
      setErrorResponse(500, 'Internal server error'),
    );
  }
}

async function getItemByID(req, res) {
  try {
    const Permissions = await hasPermissions(req.user._id, req.params.id);
    if (Permissions) {
      return Todo.find({ _id: req.params.id }).then((result) => res.send(result));
    }
    return res.status(404).send(
      setErrorResponse(404, 'Item not found or Unauthorized'),
    );
  } catch (e) {
    return res.status(500).send(
      setErrorResponse(500, 'Internal server error'),
    );
  }
}

async function deleteItemById(req, res) {
  try {
    const Permissions = await hasPermissions(req.user._id, req.params.id);
    if (Permissions) {
      return Todo.remove({ _id: req.params.id }).then(() => res.status(200).send(
        setErrorResponse(200, 'Delete Completed'),
      ));
    }
    return res.status(404).send(
      setErrorResponse(404, 'Unauthorized'),
    );
  } catch (e) {
    return res.status(404).send(
      setErrorResponse(404, 'Item not found'),
    );
  }
}

async function updateItemByID(req, res) {
  try {
    const Permissions = await hasPermissions(req.user._id, req.params.id);
    if (Permissions) {
      const { description, complete } = req.body;
      const dataToUpdate = setUpFieldsToUpdate(complete, description);
      return Todo.findOneAndUpdate(
        { _id: req.params.id },
        dataToUpdate,
        { new: true },
      ).then((result) => res.send(result));
    }
    return res.status(404).send(
      setErrorResponse(404, 'Item not found or Unauthorized'),
    );
  } catch (e) {
    return res.status(500).send(
      setErrorResponse(500, 'Internal server error'),
    );
  }
}

async function deleteCompleted(req, res) {
  try {
    return Todo.remove({ complete: true, author: req.user._id }).then((result) => {
      if (result.deletedCount > 0) {
        return res.status(200).send(
          setErrorResponse(200, 'Delete all completed Items'),
        );
      }
      return res.status(404).send(
        setErrorResponse(404, 'Items not found'),
      );
    });
  } catch (e) {
    return res.status(500).send(
      setErrorResponse(500, 'Internal server error'),
    );
  }
}

module.exports = {
  getItems,
  createItem,
  getItemByID,
  deleteItemById,
  updateItemByID,
  deleteCompleted,
};
