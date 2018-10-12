'use strict';

const  R = require('ramda'),
  config = require('config');

/**
 * Save a file to amazon s3.
 * @param {Object} aws-sdk instance reference
 * @param {String} fileName
 * @param {String} newfileName
 * @returns {Promise}
 */
const copyFile = R.curry((s3, newName, oldName) => {
  return new Promise((resolve, reject) => {
    const params = config.aws.copyObjectParams(newName, oldName);
    s3.copyObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
});

module.exports = copyFile;
