//mkdir express-todo-app
//cd express-todo-app
//npm init -y
//npm install express body-parser
//touch app.js
// app.js
//while running- node app.js
//Server is running on http://localhost:3000
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data (in-memory database)
let todos = [];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  const newTodo = { id: todos.length + 1, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET a single todo by ID
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// PUT to update a todo by ID
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (text) todo.text = text;
  if (typeof completed === 'boolean') todo.completed = completed;

  res.json(todo);
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// http://localhost:3000/todos
//  {  "text": "Buy groceries" }
// http://localhost:3000/todos/1 (replace 1 with the ID of the todo)
// {  "text": "Buy groceries and cook dinner",
// "completed": true  }