const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mealora';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Notice]: Could not connect to local MongoDB. Operating in Full-Featured In-Memory Database Mode.`);
    return false;
  }
};

module.exports = connectDB;
