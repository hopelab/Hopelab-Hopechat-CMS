'use strict';

var R = require('ramda');

var listObjectsCallback = function(deferred, fs, unlinkCallback) {
  return function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      // fs.unlink(file.path, unlinkCallback(deferred, fileName));
    }
  };
};

module.exports = listObjectsCallback;
