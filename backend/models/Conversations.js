const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  history: [String], // array of chat messages
  // add more fields as necessary
});

module.exports = mongoose.model('Conversation', ConversationSchema);
