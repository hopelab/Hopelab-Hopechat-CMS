'use strict';

const fs = require('fs'),
  Q = require('q'),
  R = require('ramda'),
  config = require('config');

const buildPublicLinkList = require('../helpers/buildPublicLinkList');

/**
 * Get all files from a bucket on amazon s3.
 * @param {Object} aws-sdk instance reference
 * @returns {Promise}
 */
const getFiles = R.curry((s3, test) => {
  return new Promise((resolve, reject) => {
    s3.listObjects(config.aws.listObjectParams(), (err, data) => {
      if (err) {
        reject();
      }

      resolve(
        buildPublicLinkList(
          data.Contents,
          config.aws.config.region,
          config.aws.bucket
        )
      );
    });
  });
});

module.exports = getFiles;
