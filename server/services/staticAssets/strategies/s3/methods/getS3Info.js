'use strict';

const fs = require('fs'),
  config = require('config');

const getS3Info = file => ({
    key: file.name.replace(/\.[^/.]+$/, ''),
    url: `https://s3-${config.aws.config.region}.amazonaws.com/${config
      .aws.bucket}/${file.name}`,
    type: file.type
});

module.exports = getS3Info;
