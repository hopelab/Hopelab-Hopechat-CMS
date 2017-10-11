const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.post('/create', (req, res) => {
    Message.create(req.body)
        .then(r => res.send(r))
        .catch(console.error);
});

router.post('/update', (req, res) => {
    Message.update(req.body)
        .then(r => res.send(r))
        .catch(console.error);
});

router.get('/all', (req, res) => {
    Message.all()
        .then(r => res.send(r))
        .catch(console.error);
});

router.get('/:id', (req, res) => {
    Message.get(req.params.id)
        .then(r => res.send(r))
        .catch(console.error);
});

router.post('/delete', (req, res) => {
    Message.delete(req.body.id)
        .then(r => res.send(r))
        .catch(console.error);
});

module.exports = router;
