const router = require('express').Router();
const { Thought, User } = require('../models');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new thought
router.post('/', async (req, res) => {
  try {
    const { userId, ...thoughtData } = req.body;
    const newThought = await Thought.create({ ...thoughtData, username: 'Placeholder' });

    // Update user's thoughts array
    await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    // Remove thought ID from associated user's thoughts array
    await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.id } });

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
