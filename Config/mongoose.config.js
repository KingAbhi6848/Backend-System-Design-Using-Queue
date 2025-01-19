import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/backend-management");


const db = mongoose.connection;

db.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('✅ MongoDB connected successfully!');
});

export default db;
