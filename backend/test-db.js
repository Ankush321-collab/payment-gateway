const mongoose = require('mongoose');



console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
  console.log('Connection details:');
  console.log('- Host:', mongoose.connection.host);
  console.log('- Port:', mongoose.connection.port);
  console.log('- Database:', mongoose.connection.name);
  process.exit(0);
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:');
  console.error(error);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure MongoDB is installed');
  console.log('2. Make sure MongoDB service is running');
  console.log('3. Check if MongoDB is running on the default port (27017)');
  process.exit(1);
}); 