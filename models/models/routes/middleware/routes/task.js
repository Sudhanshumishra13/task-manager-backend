const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

// Create task
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = new Task({ userId: req.user, title, description, dueDate });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(req.params.id,
    { title, description, status, dueDate },
    { new: true });
  res.json(updatedTask);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
