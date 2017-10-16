const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

router.post('/create', (req, res) => {
  Collection.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
  Collection.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
  Collection.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
  Collection.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
  Collection.delete(req.body.id).then(r => res.send(r));
});

module.exports = router;
