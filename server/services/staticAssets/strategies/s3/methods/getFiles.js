'use strict';

const fs = require('fs'),
  R = require('ramda'),
  config = require('config');

const buildPublicLinkList = require('../helpers/buildPublicLinkList');

/**
 * Get all files from a bucket on amazon s3.
 * @param {Object} aws-sdk instance reference
 * @returns {Promise}
 */
const getFiles = R.curry((s3, fileType) => {
  return new Promise((resolve, reject) => {
    s3.listObjects(config.aws.listObjectParams(), (err, data) => {
      if (err) {
        console.warn(err);
        reject();
      } else {
        resolve(
          buildPublicLinkList(
            data.Contents,
            fileType,
            config.aws.config.region,
            config.aws.bucket
          )
        );
      }
    });
  });
});

module.exports = getFiles;
