const express = require('express');
const router = express.Router();

router.use('/conversations', require('./conversations'));
router.use('/collections', require('./collections'));
router.use('/series', require('./series'));
router.use('/blocks', require('./blocks'));
router.use('/messages', require('./messages'));
router.use('/images', require('./images'));
router.use('/tags', require('./tags'));
router.use('/users', require('./users'));
router.use('/media', require('./media'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
