const mongoose = require('mongoose');

const todoScheme = new mongoose.Schema({
  description: String,
  complete: { type: Boolean, default: false },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
},
{ versionKey: false });

const Todo = mongoose.model('todo', todoScheme);

module.exports = Todo;
