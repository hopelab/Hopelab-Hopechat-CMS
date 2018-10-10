const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Composite = require('../models/composite');

router.post('/create', (req, res) => {
  Order.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
  Order.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
  Order.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
  Order.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
  Composite.deleteEntity(req.body).then(r => res.send(r));
});

module.exports = router;
