'use strict';

const fs     = require('fs'),
      Q      = require('q'),
      R      = require('ramda'),
      config = require('config');

const putObjectCallback = require('../helpers/putObjectCallback'),
      unlinkCallback    = require('../helpers/unlinkCallback');

/**
 * Save a file to amazon s3.
 * @param {Object} aws-sdk instance reference
 * @param {String} fileName
 * @param {*} file
 * @returns {Promise}
 */
const saveFile = R.curry((s3, fileName, file) => {
  const deferred   = Q.defer(),
        bodyStream = fs.createReadStream(file.path),
        params     = config.aws.setObjectParams(fileName, bodyStream, file.type);

  s3.putObject(params, putObjectCallback(deferred, fs, unlinkCallback, fileName, file));

  return deferred.promise;
});

module.exports = saveFile;
