'use strict';

const fs = require('fs'),
  R = require('ramda'),
  getS3Info = require('./getS3Info'),
  config = require('config');

/**
 * Save a file to amazon s3.
 * @param {Object} aws-sdk instance reference
 * @param {String} fileName
 * @param {*} file
 * @returns {Promise}
 */
const saveFile = R.curry((s3, fileName, file) => {
  return new Promise((resolve, reject) => {
    const bodyStream = fs.createReadStream(file.path),
      params = config.aws.setObjectParams(fileName, bodyStream, file.type);

    s3.putObject(params, err => {
      if (err) {
        reject();
      }
      fs.unlink(file.path, () => {
        resolve(getS3Info(file));
      });
    });
  });
});

module.exports = saveFile;
