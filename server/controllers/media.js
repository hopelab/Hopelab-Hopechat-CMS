const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const getS3Info = require('../services/staticAssets/strategies/s3/methods/getS3Info');
const { apiErrorResponse } = require('../utils/data');

router.post('/create', (req, res) => {
  req.setTimeout(0);
  Media.upload(req.files)
    .then(Media.uploadToFacebookIfVideo)
    .then(() => res.send(getS3Info(req.files.file)))
    .catch(apiErrorResponse);
});

router.get('/delete/:name/:type', (req, res) => {
  req.setTimeout(0);
  Media.delete(req.params.name, req.params.type)
    .then(media => res.send(media))
    .catch(apiErrorResponse);
});

module.exports = router;
