'use strict';

const  R = require('ramda'),
  config = require('config');

/**
 * Save a file to amazon s3.
 * @param {Object} aws-sdk instance reference
 * @param {String} fileName
 * @returns {Promise}
 */
const getFileMeta = R.curry((s3, fileName) => {
  return new Promise((resolve, reject) => {
    const params = config.aws.headObjectParams(fileName);
    s3.headObject(params, (err, data) => {
      if (err || !data) {
        console.error(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
});

module.exports = getFileMeta;
