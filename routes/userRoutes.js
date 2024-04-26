const router = require('express').Router();
const mongoose = require('mongoose');
const  User  = require('../models/user.js');


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log('All users:', users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(400).json(err);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    console.log('Single user:', user);
    res.json(user);
  } catch (err) {
    console.error('Error fetching single user:', err);
    res.status(400).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log('New user created:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating new user:', err);
    res.status(400).json(err);
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Updated user:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json(err);
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Trigger the pre-hook to delete associated thoughts
    await deletedUser.remove();

    console.log('User deleted successfully');
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(400).json(err);
  }
});


// Add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { friendId } = req.params;
    const user = await User.findById(req.params.userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(friendId)) {
      console.log('Friend already added');
      return res.status(400).json({ message: 'Friend already added' });
    }

    user.friends.push(friendId);
    await user.save();

    console.log('Friend added successfully');
    res.status(201).json(user);
  } catch (err) {
    console.error('Error adding friend:', err);
    res.status(400).json(err);
  }
});

// Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { friendId } = req.params;
    const user = await User.findById(req.params.userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friends.includes(friendId)) {
      console.log('Friend not found');
      return res.status(400).json({ message: 'Friend not found' });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();

    console.log('Friend removed successfully');
    res.sendStatus(204);
  } catch (err) {
    console.error('Error removing friend:', err);
    res.status(400).json(err);
  }
});

module.exports = router;
