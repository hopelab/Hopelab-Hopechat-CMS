'use strict';

const R          = require('ramda'),
      winston    = require('winston'),
      logUtils   = require('alien-node-winston-utils')

// These values can be overridden by either environment vars or by a NODE_ENV named config
// which declares the desired object of the same name.
const FALLBACK_DEFAULT_VALUES = {
  host          : 'localhost',
  sessionSecret : 'secret',
  aws           : {
    bucket : 'hopelab-test',
    acl    : 'public-read',
    config : {
      accessKeyId     : 'AKIAISSVJKZQYK5OOKFA',
      secretAccessKey : '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',
      region          : 'us-west-2'
    }
  }

};

const config = {
  aws : {
    client          : 'aws-sdk',
    bucket          : R.defaultTo(
      R.path(['aws', 'bucket'], FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'AWS_BUCKET'], process)
    ),
    setObjectParams : (key, val, ContentType) => {
      return {
        Bucket       : R.defaultTo(
          R.path(['aws', 'bucket'], FALLBACK_DEFAULT_VALUES),
          R.path(['env', 'AWS_BUCKET'], process)
        ),
        ACL          : R.defaultTo(
          R.path(['aws', 'acl'], FALLBACK_DEFAULT_VALUES),
          R.path(['env', 'AWS_ACL'], process)
        ),
        Key          : key,
        Body         : val,
        ContentType  : ContentType,
        CacheControl : 'max-age=864000'
      };
    },
    config          : {
      accessKeyId     : R.defaultTo(
        R.path(['aws', 'config', 'accessKeyId'], FALLBACK_DEFAULT_VALUES),
        R.path(['env', 'AWS_ACCESS_KEY_ID'], process)
      ),
      secretAccessKey : R.defaultTo(
        R.path(['aws', 'config', 'secretAccessKey'], FALLBACK_DEFAULT_VALUES),
        R.path(['env', 'AWS_SECRET_ACCESS_KEY'], process)
      ),
      region          : R.defaultTo(
        R.path(['aws', 'config', 'region'], FALLBACK_DEFAULT_VALUES),
        R.path(['env', 'AWS_REGION'], process)
      )
    }
  }
};

module.exports = config;

console.log('USING DEFAULT CONFIG');
