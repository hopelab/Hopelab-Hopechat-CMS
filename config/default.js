'use strict';

const R = require('ramda'),
  winston = require('winston'),
  logUtils = require('alien-node-winston-utils'),
  AWS = require('aws-sdk');

// These values can be overridden by either environment vars or by a NODE_ENV named config
// which declares the desired object of the same name.

const credentials = new AWS.SharedIniFileCredentials();
const FALLBACK_DEFAULT_VALUES = {
  host: 'localhost',
  sessionSecret: 'secret',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  aws: {
    bucket: 'hopelab-media',
    acl: 'public-read-write',
    config: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      region: 'us-west-2'
    }
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
  facebook: {
    fbPageAccessToken: R.defaultTo(
      R.path(['facebook', 'fbPageAccessToken'], FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'FB_PAGE_ACCESS_TOKEN'], process)
    )
  },
  aws: {
    client: 'aws-sdk',
    bucket: R.defaultTo(
      R.path(['aws', 'bucket'], FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'AWS_BUCKET'], process)
    ),
    listObjectParams: () => {
      return {
        Bucket: R.defaultTo(
          R.path(['aws', 'bucket'], FALLBACK_DEFAULT_VALUES),
          R.path(['env', 'AWS_BUCKET'], process)
        )
      };
    },
    setObjectParams: (key, val, ContentType) => {
      return {
        Bucket: R.defaultTo(
          R.path(['aws', 'bucket'], FALLBACK_DEFAULT_VALUES),
          R.path(['env', 'AWS_BUCKET'], process)
        ),
        ACL: R.defaultTo(
          R.path(['aws', 'acl'], FALLBACK_DEFAULT_VALUES),
          R.path(['env', 'AWS_ACL'], process)
        ),
        Key: key,
        Body: val,
        ContentType: ContentType,
        CacheControl: 'max-age=864000'
      };
    },
    config: {
      accessKeyId: R.defaultTo(
        R.path(['aws', 'config', 'accessKeyId'], FALLBACK_DEFAULT_VALUES),
        R.path(['env', 'AWS_ACCESS_KEY_ID'], process)
      ),
      secretAccessKey: R.defaultTo(
        R.path(['aws', 'config', 'secretAccessKey'], FALLBACK_DEFAULT_VALUES),
        R.path(['env', 'AWS_SECRET_ACCESS_KEY'], process)
      ),
      region: R.defaultTo(
        R.path(['aws', 'config', 'region'], FALLBACK_DEFAULT_VALUES),
        R.path(['env', 'AWS_REGION'], process)
      )
    }
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

console.log('USING DEFAULT CONFIG');
