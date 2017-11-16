'use strict';

const fs = require('fs'),
  Q = require('q'),
  R = require('ramda'),
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

    s3.putObject(params, (err, res) => {
      if (err) {
        reject();
      }
      fs.unlink(file.path, () => {
        resolve({
          key: file.name.replace(/\.[^/.]+$/, ''),
          url: `https://s3-${config.aws.config.region}.amazonaws.com/${config
            .aws.bucket}/${file.name}`
        });
      });
    });
  });
});

module.exports = saveFile;
