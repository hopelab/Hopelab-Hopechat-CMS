const express = require('express');
const router = express.Router();
const StudyInfo = require('../models/study');

router.post('/create', (req, res) => {
  StudyInfo.create(req.body).then(r => res.send(r));
});


router.get('/all', (req, res) => {
  StudyInfo.all().then(r => res.send(r));
});

module.exports = router;
