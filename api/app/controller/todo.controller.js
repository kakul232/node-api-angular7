const todoModel = require('../model/todo.model.js');

// Create and Save a new todo
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "todo content can not be empty"
        });
    }

    // Create a todo
    const todo = new todoModel({
        todo: req.body.todo || "Untodod todo", 
        content: req.body.content
    });

    

    // Save todo in the database
    todo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the todo."
        });
    });
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
    todoModel.find()
    .then(todos => {
        res.send(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};

// Find a single todo with a todoId
exports.findOne = (req, res) => {
    todoModel.findById(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });            
        }
        res.send(todo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving todo with id " + req.params.todoId
        });
    });
};

// Update a todo identified by the todoId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "todo content can not be empty"
        });
    }

    // Find todo and update it with the request body
    todoModel.findByIdAndUpdate(req.params.todoId, {
        todo: req.body.todo || "Untodod todo",
        content: req.body.content
    }, {new: true})
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });
        }
        res.send(todo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });                
        }
        return res.status(500).send({
            message: "Error updating todo with id " + req.params.todoId
        });
    });
};

// Delete a todo with the specified todoId in the request
exports.delete = (req, res) => {
    todoModel.findByIdAndRemove(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });
        }
        res.send({message: "todo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete todo with id " + req.params.todoId
        });
    });
};