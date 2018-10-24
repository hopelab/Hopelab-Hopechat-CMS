'use strict';

const  R = require('ramda'),
  config = require('config');

/**
 * Save a file to amazon s3.
 * @param {Object} aws-sdk instance reference
 * @param {String} fileName
 * @returns {Promise}
 */
const deleteFile = R.curry((s3, fileName) => {
  return new Promise((resolve, reject) => {
    const params = config.aws.deleteObjectParams(fileName);
    s3.deleteObject(params, err => {
      if (err) {
        reject(err);
      }
      resolve(null);
    });
  });
});

module.exports = deleteFile;
