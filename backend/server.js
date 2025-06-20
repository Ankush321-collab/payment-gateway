const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const PORT = process.env.PORT || 5001;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/computer-point-nepal';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.log('Make sure MongoDB is running.');
    process.exit(1);
  });
  app.get('/', (req, res) => {
    res.send('Welcome to Computer Point Nepal Backend');
  });
  

// Start server regardless of DB connection (optional design)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
