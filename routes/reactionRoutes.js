const router = require('express').Router();
const { Thought, Reaction } = require('../models');

// Create a reaction for a thought
router.post('/:thoughtId', async (req, res) => {
  try {
    const { username, reactionBody } = req.body;
    const newReaction = await Reaction.create({ username, reactionBody });

    // Update thought's reactions array
    await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: newReaction._id } });

    res.status(201).json(newReaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a reaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);

    // Remove reaction ID from associated thought's reactions array
    await Thought.findByIdAndUpdate(deletedReaction.thoughtId, { $pull: { reactions: req.params.id } });

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
