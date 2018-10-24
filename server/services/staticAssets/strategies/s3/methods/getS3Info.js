'use strict';

const config = require('config');
const { cleanString } = require('../../../../../utils/file');

const getS3Info = file => ({
  key: file.name.replace(/\.[^/.]+$/, ''),
  url: `https://s3-${config.aws.config.region}.amazonaws.com/${config
    .aws.bucket}/${encodeURI(cleanString(file.name))}`,
  mimeType: file.type,
  type: file.type ? file.type.split('/')[0] : undefined
});

module.exports = getS3Info;
