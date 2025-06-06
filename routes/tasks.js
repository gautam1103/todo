const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create
router.post('/', async (req, res) => {
  const task = new Task(req.body);
  const savedTask = await task.save();
  res.json(savedTask);
});

// Read All
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
