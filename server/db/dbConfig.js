const mongoose = require('mongoose');

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Database connection failed')
  }
}

module.exports = ConnectDB;