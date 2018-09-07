const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const getS3Info = require('../services/staticAssets/strategies/s3/methods/getS3Info');
const { apiErrorResponse } = require('../utils/data');

router.post('/create', (req, res) => {
  req.setTimeout(0);
  Media.upload(req.files)
    .then(Media.uploadToFacebookIfVideo)
    .then(console.log) // eslint-disable-line no-console
    .catch(apiErrorResponse);

  return res.send(getS3Info(req.files.file));
});

module.exports = router;
