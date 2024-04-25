const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'] 
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { toJSON: { virtuals: true }, id: false });

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

// pre-hook to delete associated thoughts
userSchema.pre('remove', async function (next) {
  try {
    const user = this;

    // Delete the user's associated thoughts
    await mongoose.model('Thought').deleteMany({ username: user.username });

    next();
  } catch (error) {
    next(error);
  }
});



module.exports = User;
