'use strict';

var R = require('ramda');

var unlinkCallback = function(deferred, fileName) {
  return function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(fileName);
    }
  };
};

module.exports = unlinkCallback;
