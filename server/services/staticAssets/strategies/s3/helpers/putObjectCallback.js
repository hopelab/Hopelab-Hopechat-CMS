'use strict';

var R  = require('ramda');

var putObjectCallback = function(deferred, fs, unlinkCallback, fileName, file) {
  return function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      fs.unlink(file.path, unlinkCallback(deferred, fileName));
    }
  };
};

module.exports = putObjectCallback;
