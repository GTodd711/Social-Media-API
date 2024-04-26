require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Thought = require('./models/thought');
const Reaction = Thought.schema.path('reactions').schema;
const userData = require('./seeds/userseed');
const thoughtData = require('./seeds/thoughtseed');
const reactionData = require('./seeds/reactionseed');

const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verify connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Function to seed users
  const seedUsers = async () => {
    try {
      await User.deleteMany(); // Clear existing data
      await User.insertMany(userData); // Insert new data
      console.log('Users seeded successfully');
    } catch (err) {
      console.error('Error seeding users:', err);
    }
  };

  // Function to seed thoughts
  const seedThoughts = async () => {
    try {
      await Thought.deleteMany(); // Clear existing data
      await Thought.insertMany(thoughtData); // Insert new data
      console.log('Thoughts seeded successfully');
    } catch (err) {
      console.error('Error seeding thoughts:', err);
    }
  };

  // Function to seed reactions
  const seedReactions = async () => {
    try {
      // Clear all reactions in thoughts
      await Thought.updateMany({}, { reactions: [] });
      console.log('Reactions cleared successfully');
    } catch (err) {
      console.error('Error clearing reactions:', err);
    }
  };

  // Run seeding functions
  const seedDatabase = async () => {
    await seedUsers();
    await seedThoughts();
    await seedReactions();
    mongoose.connection.close(); // Close the connection after seeding
  };

  // Call the seeding function
  seedDatabase();
});
