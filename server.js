const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Todo = require('./models/Todo');

const app = express();
app.use(cors());

// app.use(cors({
//   origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://kya-chll-rha-hai-dimag-mein.onrender.com']
// }));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
  
// app.get('/testdb', async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     console.log("TestDB Todos:", todos);
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ error: 'Test DB failed' });
//   }
// });


// GET /todos - fetch all todos from DB
app.get('/todos', async (req, res) => {
  try {
      const todos = await Todo.find();
       console.log("Todos from DB:", todos);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /todos - add new todo to DB
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// DELETE /todos/:id - delete todo from DB
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
