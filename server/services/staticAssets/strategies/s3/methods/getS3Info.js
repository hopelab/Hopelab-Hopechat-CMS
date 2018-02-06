'use strict';

const fs = require('fs'),
  config = require('config');

const getS3Info = file => ({
    key: file.name.replace(/\.[^/.]+$/, ''),
    url: `https://s3-${config.aws.config.region}.amazonaws.com/${config
      .aws.bucket}/${file.name}`,
    mimeType: file.type,
    type: !!file.type ? file.type.split('/')[0] : undefined
});

module.exports = getS3Info;