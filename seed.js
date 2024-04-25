require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Thought = require('./models/thought');
const Reaction = require('./models/reaction');
const userData = require('./seeds/user.json');
const thoughtData = require('./seeds/thoughts.json');
const reactionData = require('./seeds/reactions.json');

const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017/mydatabase`;

console.log('MongoDB URI:', mongoURI);

// Connect to MongoDB
mongoose.connect(mongoURI, {
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
      await Reaction.deleteMany(); // Clear existing data
      await Reaction.insertMany(reactionData); // Insert new data
      console.log('Reactions seeded successfully');
    } catch (err) {
      console.error('Error seeding reactions:', err);
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
