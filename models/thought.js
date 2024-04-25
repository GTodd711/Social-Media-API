const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: timestamp => timestamp.toLocaleString() },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: timestamp => timestamp.toLocaleString() },
  username: { type: String, required: true },
  reactions: [reactionSchema], // Subdocument schema for reactions
}, { toJSON: { virtuals: true }, id: false });

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = mongose.model('Thought', thoughtSchema);
