const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true, min: 0 },
  stage: { type: String, enum: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], default: 'Lead' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  expectedCloseDate: Date,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);