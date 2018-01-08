const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', (req, res) => {
  User.all().then(data => res.json(data));
});

module.exports = router;
