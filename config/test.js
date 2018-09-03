const R = require('ramda');

// These values can be overridden by either environment vars or by a NODE_ENV named config
// which declares the desired object of the same name.
const FALLBACK_DEFAULT_VALUES = {
  host: 'localhost',
  sessionSecret: 'secret',
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};

const config = {
  redis: {
    host: R.defaultTo(
      R.path(['redis', 'host'], FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'REDIS_HOST'], process)
    ),
    port: R.defaultTo(
      R.path(['redis', 'port'], FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'REDIS_PORT'], process)
    )
  },
  entities: {
    conversation: {
      childrenConnected: true,
      children: ['message', 'collection']
    },
    collection: {
      childrenConnected: false,
      children: ['series']
    },
    series: {
      childrenConnected: false,
      children: ['block']
    },
    block: {
      childrenConnected: true,
      children: ['message']
    },
    message: {
      children: []
    }
  }
};

module.exports = config;
