const express = require('express');
const router = express.Router();
const Block = require('../models/block');

router.post('/create', (req, res) => {
  Block.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
  Block.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
  Block.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
  Block.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
  Block.delete(req.body.id).then(r => res.send(r));
});

module.exports = router;
