const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  category: { type: String, enum: ['Bug', 'Feature Request', 'Support', 'Billing', 'Other'], default: 'Other' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);