'use strict';

const R      = require('ramda'),
      AWS    = require('aws-sdk'),
      config = require('config');

AWS.config.update(R.path(['aws', 'config'], config));

const s3 = new AWS.S3();

module.exports = {
  saveFile : require('./methods/saveFile')(s3)
};
