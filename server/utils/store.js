const redis = require('redis');
const redisClient = redis.createClient();
const store = require('alien-node-redis-utils')(redisClient);

module.exports = store;
