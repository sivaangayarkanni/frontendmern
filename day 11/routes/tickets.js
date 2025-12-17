const express = require('express');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tickets for user
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find({ user: req.user.id })
      .populate('customer', 'name email')
      .populate('assignedTo', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Ticket.countDocuments({ user: req.user.id });

    res.json({ tickets, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create ticket
router.post('/', auth, async (req, res) => {
  const { title, description, status, priority, category, customer, assignedTo } = req.body;
  try {
    const ticket = new Ticket({ title, description, status, priority, category, customer, assignedTo, user: req.user.id });
    await ticket.save();
    await ticket.populate('customer', 'name email');
    await ticket.populate('assignedTo', 'name email');
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    ).populate('customer', 'name email').populate('assignedTo', 'name email');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;