const express = require('express');
const router = express.Router();
const Image = require('../models/image');

router.post('/upload', (req, res) => {
  Image.upload(req.files)
    .then(r => res.send(r))
    .catch(console.error);
});

module.exports = router;
