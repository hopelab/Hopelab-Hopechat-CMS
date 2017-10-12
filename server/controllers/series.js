const express = require('express');
const router = express.Router();
const Series = require('../models/series');

router.post('/create', (req, res) => {
    Series.create(req.body).then(r => res.send(r));
});

router.post('/update', (req, res) => {
    Series.update(req.body).then(r => res.send(r));
});

router.get('/all', (req, res) => {
    Series.all().then(r => res.send(r));
});

router.get('/:id', (req, res) => {
    Series.get(req.params.id).then(r => res.send(r));
});

router.post('/delete', (req, res) => {
    Series.delete(req.body.id).then(r => res.send(r));
});

module.exports = router;
