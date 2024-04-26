const router = require('express').Router();
const mongoose = require('mongoose');
const  Thought  = require('../models/thought'); // Import Thought model

// Create a reaction for a thought
router.post('/:thoughtId', async (req, res) => {
  try {

    
    // Update thought's reactions array
    const newReaction = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } },{ new: true });

    console.log('New reaction created:', newReaction);
    res.status(201).json(newReaction);
  } catch (err) {
    console.error('Error creating new reaction:', err);
    res.status(400).json(err);
  }
});

// Delete a reaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedReaction = await Thought.findOneAndUpdate( {reactionId:req.params.id},{$pull:{reactions: req.params.id}});

    console.log('Reaction deleted successfully');
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting reaction:', err);
    res.status(400).json(err);
  }
});

module.exports = router;
