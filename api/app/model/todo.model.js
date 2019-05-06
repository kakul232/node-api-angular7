const Mongoose = require('mongoose');

const TodoSchema= Mongoose.Schema({
    todo : String,
    content: String
}, {
    timestamps: true
});

module.exports=Mongoose.model('Todo',TodoSchema);