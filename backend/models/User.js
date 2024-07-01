// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;