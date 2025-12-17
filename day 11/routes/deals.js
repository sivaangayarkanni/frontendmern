const express = require('express');
const Deal = require('../models/Deal');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all deals for user
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const deals = await Deal.find({ user: req.user.id })
      .populate('contact', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Deal.countDocuments({ user: req.user.id });

    res.json({ deals, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create deal
router.post('/', auth, async (req, res) => {
  const { title, value, stage, contact, expectedCloseDate, description } = req.body;
  try {
    const deal = new Deal({ title, value, stage, contact, expectedCloseDate, description, user: req.user.id });
    await deal.save();
    await deal.populate('contact', 'name email');
    res.status(201).json(deal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update deal
router.put('/:id', auth, async (req, res) => {
  try {
    const deal = await Deal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    ).populate('contact', 'name email');
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json(deal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete deal
router.delete('/:id', auth, async (req, res) => {
  try {
    const deal = await Deal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json({ message: 'Deal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;