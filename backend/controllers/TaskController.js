const Task = require('../models/TaskModel');

exports.createTask = async (req, res) => {
  try {
    const { title, description, category, location, budget, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      category,
      location,
      budget,
      dueDate: new Date(dueDate),
      createdBy: req.user.id // assuming auth middleware adds req.user
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
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
