const Task = require('../models/TaskModel');

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('createdBy').populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    task.assignedTo = req.body.assignedTo;
    task.status = 'assigned';
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error assigning task' });
  }
};
