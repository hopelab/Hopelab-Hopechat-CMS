const redis = require('redis');
const config = require('config');

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
});
const store = require('alien-node-redis-utils')(redisClient);

module.exports = store;
