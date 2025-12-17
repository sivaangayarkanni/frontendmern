const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, trim: true, lowercase: true },
  phone: String,
  company: String,
  position: String,
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed'], default: 'New' },
  source: { type: String, enum: ['Website', 'Referral', 'Social Media', 'Email', 'Cold Call', 'Other'], default: 'Other' },
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);