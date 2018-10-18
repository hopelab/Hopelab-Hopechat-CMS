const express = require('express');
const router = express.Router();
const Composite = require('../models/composite');
const { apiErrorResponse } = require('../utils/data');
const redisClient = require('../utils/client');
const { promisify } = require('util');

const getLAsync = promisify(redisClient.lrange).bind(redisClient);

router.post('/start/update', (req, res) => {
  Composite.updateStart(req.body)
    .then(r => res.send(r))
    .catch(apiErrorResponse(res));
});

router.get('/list/:listToGet', (req, res) => {
  getLAsync(req.params.listToGet, 0, -1)
    .then(r => res.send(r))
    .catch(e => {
      // no item found matching cacheKey
      console.error(
        `error: getItem - getItemFromCache(${req.params.listToGet}})`,
        e
      );
      res.send([]);
    });
});

router.put('/list/:listToModify/:value/:index', (req, res) => {
  const { listToModify, value, index } = req.params;
  if ((/null/).test(index)) {
    redisClient.rpush(listToModify, '');
  } else {
    redisClient.lset(listToModify, index, value.trim());
  }
  getLAsync(listToModify, 0, -1)
    .then(r => res.send(r))
    .catch(e => {
      // no item found matching cacheKey
      console.error(
        `error: getItem - getItemFromCache(${req.params.id}})`,
        e
      );
      res.send([]);
    });
});

router.delete('/list/:listToModify/:value', (req, res) => {
  const { listToModify, value } = req.params;
  redisClient.lrem(listToModify, 1, (/null/).test(value) ? '' : value);
  getLAsync(listToModify, 0, -1)
    .then(r => res.send(r))
    .catch(e => {
      // no item found matching cacheKey
      console.error(
        `error: getItem - getItemFromCache(${req.params.id}})`,
        e
      );
      res.send([]);
    });
});

module.exports = router;
