const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const { apiErrorResponse } = require('../utils/data');

router.get('/all', (req, res) => {
  Promise.resolve()
    .then(Video.getVideos)
    .then(r => res.send(r))
    .catch(apiErrorResponse(res));
});

module.exports = router;
