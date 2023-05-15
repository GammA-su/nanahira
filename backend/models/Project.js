const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  goal: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // add more fields as necessary
});

module.exports = mongoose.model('Project', ProjectSchema);
