const express = require('express');
const router = express.Router();
const Image = require('../models/image');

router.get('/all', (req, res) => {
  Image.getImages().then(r => res.send(r));
});

router.post('/create', (req, res) => {
  Image.upload(req.files)
    .then(r => res.send(r))
    .catch(console.error);
});

module.exports = router;
