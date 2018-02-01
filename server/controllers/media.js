const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const { apiErrorResponse } = require('../utils/data');

router.post('/create', (req, res) => {
  Promise.resolve(req.files)
    .then(Media.upload)
    .then(r => res.send(r))
    .catch(apiErrorResponse(res));
});

module.exports = router;
