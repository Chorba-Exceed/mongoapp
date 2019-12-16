const Todo = require('../database/models/todo');

function hasPermissions(idUser, idAuthor) {
    return(Todo.find({_id: idAuthor}).then((result) =>
        {
           return (result[0].author.toString() === idUser.toString());
        }))
}
module.exports = hasPermissions;