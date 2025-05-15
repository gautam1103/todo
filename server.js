// const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const taskRoutes = require('./routes/tasks');
// app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

const express = require('express');
const cors = require('cors');
const app = express();
//app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));


let todos = [];

// GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now().toString(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== req.params.id);
  res.sendStatus(204);
});

// Optional: serve the HTML from /public folder
app.use(express.static('public'));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
