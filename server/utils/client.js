const redis = require('redis');
const config = require('config');

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
});

module.exports = redisClient;
