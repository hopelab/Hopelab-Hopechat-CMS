const redisClient = require('./client');
const store = require('alien-node-redis-utils')(redisClient);

module.exports = store;
