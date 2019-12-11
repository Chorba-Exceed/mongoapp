const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const Todo = require('../database/connectionDB');
const {setErrorResponse, setUpFieldsToUpdate} = require('../helpers/helpers');

function getItem(req, res) {
    Todo.find({}).then((result) => {
        return res.status(200).send(result);
    }).catch((err) => {
        return res.status(500).send(
            setErrorResponse(500, 'Internal server error')
        )
    })
}

function createItem(req, res) {
    const todos = req.body;
    Todo.create(todos).then((result) => {
        return res.send(result);
    })
}

function getItemByID(req, res) {
    Todo.find({_id: req.params.id}).then((result) => {
        return res.send(result);
    }).catch(() => {
        return res.status(404).send(
            setErrorResponse(404, 'Item not found')
        )
    })
}

function deleteItemById(req, res) {
    Todo.remove({_id: req.params.id}).then((result) => {
        if (result.deletedCount === 0) {
            return res.status(404).send(
                setErrorResponse(404, 'Item not found')
            )
        } else {
            return res.status(200).send(
                setErrorResponse(200, 'Delete Completed')
            )
        }
    })
}

function updateItemByID(req, res) {
    const {description, complete} = req.body;
    const dataToUpdate = setUpFieldsToUpdate(complete, description);
    Todo.findOneAndUpdate(
        {_id: req.params.id},
        dataToUpdate,
        {new: true}
    ).then((result) => {
        return res.send(result);
    })
}

module.exports = {
    getItem,
    createItem,
    getItemByID,
    deleteItemById,
    updateItemByID
};