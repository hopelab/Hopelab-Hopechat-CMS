const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Composite = require('../models/composite');

router.post('/create', (req, res) => {
  Message.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
  Message.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
  Message.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
  Message.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
  Composite.deleteEntity(req.body).then(r => res.send(r));
});

module.exports = router;
