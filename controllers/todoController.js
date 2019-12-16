const Todo = require('../database/models/todo');
const {setErrorResponse, setUpFieldsToUpdate} = require('../helpers/helpers');
const hasPermissions = require('../helpers/Permissions')

async function getItem(req, res) {
    try {
        let todos = await Todo.find({author: req.user._id}).exec();
        return res.send(todos);
    } catch (err) {
        return res.status(500).send(
            setErrorResponse(500, 'Internal server error')
        )
    }
}

async function createItem(req, res) {
    try {
        let todos = req.body;
        todos.author = req.user._id;
        todos = await Todo.create(todos).exec();
        return res.send(todos);
    } catch (err) {
        return res.status(500).send(
            setErrorResponse(500, 'Internal server error')
        )
    }
}

async function getItemByID(req, res) {
        try {
            let Permissions = await hasPermissions(req.user._id, req.params.id);
            if (Permissions) {
                Todo.find({_id: req.params.id}).then((result) => {
                    return res.send(result);
                })
            } else {
                return res.status(404).send(
                    setErrorResponse(404, 'Item not found or Unauthorized')
                )
            }
        }
        catch (e) {
            return res.status(500).send(
                setErrorResponse(500, 'Internal server error')
            )
        }

}

async function deleteItemById(req, res) {
    try{
        let Permissions = await hasPermissions(req.user._id, req.params.id);
        if (Permissions) {
            Todo.remove({_id: req.params.id}).then((result) => {
                    return res.status(200).send(
                        setErrorResponse(200, 'Delete Completed')
                    )
            })
        } else {
            return res.status(404).send(
                setErrorResponse(404, 'Unauthorized')
            )
        }
    }
    catch (e) {
        return res.status(404).send(
            setErrorResponse(404, 'Item not found')
        )
    }
}

async function updateItemByID(req, res) {
    try {
        let Permissions = await hasPermissions(req.user._id, req.params.id);
        if (Permissions) {
            const {description, complete} = req.body;
            const dataToUpdate = setUpFieldsToUpdate(complete, description);
            Todo.findOneAndUpdate(
                {_id: req.params.id},
                dataToUpdate,
                {new: true}
            ).then((result) => {
                return res.send(result);
            })
        } else {
            return res.status(404).send(
                setErrorResponse(404, 'Item not found or Unauthorized')
            )
        }
    }
    catch (e) {
        return res.status(500).send(
            setErrorResponse(500, 'Internal server error')
        )
    }

}

async function deleteCompleted(req, res) {
    try {
        Todo.remove({complete: true, author: req.user._id}).then((result) => {
            if(result.deletedCount>0){
                return res.status(200).send(
                   setErrorResponse(200, 'Delete all completed Items')
                )
            } else {
                return res.status(404).send(
                    setErrorResponse(404, 'Items not found')
                )
            }
    })
    }
    catch (e) {
        return res.status(500).send(
            setErrorResponse(500, 'Internal server error')
        )
    }
}

module.exports = {
    getItem,
    createItem,
    getItemByID,
    deleteItemById,
    updateItemByID,
    deleteCompleted
};
