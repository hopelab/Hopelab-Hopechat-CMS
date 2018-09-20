const express = require('express');
const router = express.Router();

router.use('/general', require('./general'));
router.use('/conversations', require('./conversations'));
router.use('/collections', require('./collections'));
router.use('/series', require('./series'));
router.use('/blocks', require('./blocks'));
router.use('/messages', require('./messages'));
router.use('/images', require('./images'));
router.use('/videos', require('./videos'));
router.use('/tags', require('./tags'));
router.use('/media', require('./media'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
