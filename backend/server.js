const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/computer-point-nepal';

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Please make sure MongoDB is running on your system.');
    console.log('You can start MongoDB using:');
    console.log('- Windows: Start MongoDB service from Services');
    console.log('- macOS/Linux: sudo service mongod start');
    process.exit(1);
  }); 