module.exports = (app) => {
    const todos = require('../controller/todo.controller');

    // Create a new Todo
    app.post('/todo', todos.create);

    // Retrieve all Todo
    app.get('/todos', todos.findAll);

    // Retrieve a single Todo with todoId
    app.get('/todos/:todoId', todos.findOne);

    // Update a Todo with todoId
    app.put('/todos/:todoId', todos.update);

    // Delete a Todo with todoId
    app.delete('/todos/:todoId', todos.delete);
}