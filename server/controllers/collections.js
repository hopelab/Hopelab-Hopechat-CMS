const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');
const Composite = require('../models/composite');

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
  Composite.deleteEntity(req.body).then(r => res.send(r));
});

module.exports = router;
