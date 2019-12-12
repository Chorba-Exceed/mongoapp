const {mongoose, Schema} = require("../connectionDB")

const todoScheme = new Schema({
        description: String,
        complete: Boolean,
        author : {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { versionKey: false }
);
const Todo = mongoose.model("todo", todoScheme);

module.exports = Todo;