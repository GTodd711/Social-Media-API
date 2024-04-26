const router = require('express').Router();
const mongoose = require('mongoose');
const  User  = require('../models/user'); // Import User model
const  Thought  = require('../models/thought'); // Import Thought model


// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    console.log('All thoughts:', thoughts);
    res.json(thoughts);
  } catch (err) {
    console.error('Error fetching all thoughts:', err);
    res.status(400).json(err);
  }
});

// Get a single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    console.log('Single thought:', thought);
    res.json(thought);
  } catch (err) {
    console.error('Error fetching single thought:', err);
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

    console.log('New thought created:', newThought);
    res.status(201).json(newThought);
  } catch (err) {
    console.error('Error creating new thought:', err);
    res.status(400).json(err);
  }
});

// Update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Updated thought:', updatedThought);
    res.json(updatedThought);
  } catch (err) {
    console.error('Error updating thought:', err);
    res.status(400).json(err);
  }
});

// Delete a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    // Remove thought ID from associated user's thoughts array
    await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.id } });

    console.log('Thought deleted successfully');
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting thought:', err);
    res.status(400).json(err);
  }
});

module.exports = router;
