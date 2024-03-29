const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const { apiErrorResponse } = require('../utils/data');

router.get('/all', (req, res) => {
  Promise.resolve()
    .then(Image.getImages)
    .then(r => res.send(r))
    .catch(apiErrorResponse(res));
});

module.exports = router;
