const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const todosFile = path.join(__dirname, 'todos.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize todos file if it doesn't exist
if (!fs.existsSync(todosFile)) {
    fs.writeFileSync(todosFile, JSON.stringify([], null, 2));
}

// Helper function to read todos from file
function readTodos() {
    try {
        const data = fs.readFileSync(todosFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading todos:', err);
        return [];
    }
}

// Helper function to write todos to file
function writeTodos(todos) {
    try {
        fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
    } catch (err) {
        console.error('Error writing todos:', err);
    }
}

// Routes

// GET - Retrieve all todos
app.get('/api/todos', (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// GET - Retrieve a specific todo by ID
app.get('/api/todos/:id', (req, res) => {
    const todos = readTodos();
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
});

// POST - Create a new todo
app.post('/api/todos', (req, res) => {
    const { title, description } = req.body;

    // Validation
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required' });
    }

    const todos = readTodos();
    const newTodo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        title: title.trim(),
        description: description || '',
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
});

// PUT - Update a todo
app.put('/api/todos/:id', (req, res) => {
    const todos = readTodos();
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, description, completed } = req.body;

    // Update fields if provided
    if (title !== undefined) todos[todoIndex].title = title.trim();
    if (description !== undefined) todos[todoIndex].description = description;
    if (completed !== undefined) todos[todoIndex].completed = completed;

    writeTodos(todos);
    res.json(todos[todoIndex]);
});

// DELETE - Remove a todo
app.delete('/api/todos/:id', (req, res) => {
    const todos = readTodos();
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const deletedTodo = todos.splice(todoIndex, 1);
    writeTodos(todos);

    res.json({ message: 'Todo deleted', todo: deletedTodo[0] });
});

// DELETE - Clear all completed todos
app.delete('/api/todos', (req, res) => {
    let todos = readTodos();
    const initialLength = todos.length;
    todos = todos.filter(todo => !todo.completed);
    const deletedCount = initialLength - todos.length;

    writeTodos(todos);
    res.json({ message: `${deletedCount} completed todos deleted`, remaining: todos.length });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
