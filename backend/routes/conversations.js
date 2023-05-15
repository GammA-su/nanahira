const express = require('express');
const Conversation = require('../models/Conversation');
const router = express.Router();

// Create a new conversation
router.post('/', (req, res) => {
  const newConversation = new Conversation(req.body);
  newConversation.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newConversation);
  });
});

// Get all conversations
router.get('/', (req, res) => {
  Conversation.find({}, (err, conversations) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(conversations);
  });
});

// Get a single conversation by id
router.get('/:id', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(conversation);
  });
});

// Update a conversation
router.put('/:id', (req, res) => {
  Conversation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }, // This will return the updated conversation
    (err, conversation) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(conversation);
    }
  );
});

// Delete a conversation
router.delete('/:id', (req, res) => {
  Conversation.findByIdAndRemove(req.params.id, (err, conversation) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(conversation);
  });
});

module.exports = router;
