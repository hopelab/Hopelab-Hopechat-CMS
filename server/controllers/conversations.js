const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');

router.post('/create', (req, res) => {
  Conversation.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
  Conversation.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
  Conversation.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
  Conversation.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
  Conversation.delete(req.body.id).then(r => res.send(r));
});

module.exports = router;
