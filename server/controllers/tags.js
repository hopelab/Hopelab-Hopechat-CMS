const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

router.get('/all', (req, res) => {
  Tag.all().then(r => res.send(r));
});

router.post('/create', (req, res) => {
  Tag.add(req.body)
    .then(r => res.send(r))
    .catch(console.error);
});

module.exports = router;
