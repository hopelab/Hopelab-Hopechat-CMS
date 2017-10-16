const express = require('express');
const router = express.Router();

router.use('/conversations', require('./conversations'));
router.use('/collections', require('./collections'));
router.use('/series', require('./series'));
router.use('/blocks', require('./blocks'));
router.use('/messages', require('./messages'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
