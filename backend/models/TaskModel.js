const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  budget: Number,
  dueDate: Date,
  status: { type: String, enum: ['open', 'assigned', 'completed', 'cancelled'], default: 'open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }]
}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema);