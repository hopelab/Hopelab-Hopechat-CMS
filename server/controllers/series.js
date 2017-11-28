const express = require('express');
const router = express.Router();
const Series = require('../models/series');
const Composite = require('../models/composite');

router.post('/create', (req, res) => {
  Series.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
  Series.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
  Series.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
  Series.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
  Composite.deleteEntity(req.body).then(r => res.send(r));
});

router.post('/copy', (req, res) => {
  Composite.copyEntityAndAllChildren(req.body);
});

module.exports = router;
