const express = require('express');
const router = express.Router();
const Composite = require('../models/composite');
const { apiErrorResponse } = require('../utils/data');

router.post('/start/update', (req, res) => {
  Composite.updateStart(req.body)
    .then(r => res.send(r))
    .catch(apiErrorResponse(res));
});

module.exports = router;
