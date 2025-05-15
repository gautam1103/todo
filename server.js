const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express(); // ✅ First initialize app

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log(err);
    process.exit(1); // Stop app if DB fails
  });

// Routes
let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now().toString(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== req.params.id);
  res.sendStatus(204);
});

app.use(express.static('public'));

// ✅ Now it's safe to start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
