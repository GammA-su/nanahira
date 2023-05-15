const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  // add more fields as necessary
});

module.exports = mongoose.model('User', UserSchema);
