'use strict';

const  R = require('ramda'),
  config = require('config');


/**
 * Save a file to amazon s3.
 * @param {Object} aws-sdk instance reference
 * @param {String} fileName
 * @param {*} file
 * @returns {Promise}
 */
const deleteFile = R.curry((s3, fileName) => {
  return new Promise((resolve, reject) => {
    const params = config.aws.deleteObjectParams(fileName);
    console.log(params)
    s3.deleteObject(params, err => {
      if (err) {
        console.log(err)
        reject();
      }
      resolve(null);
    });
  });
});

module.exports = deleteFile;
