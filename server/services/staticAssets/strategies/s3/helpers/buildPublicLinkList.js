'use strict';

var R = require('ramda');

var buildPublicLinkList = function(assets, region, bucket) {
  return assets.map(a => ({
    key: a.Key.replace(/\.[^/.]+$/, ''),
    url: `https://s3-${region}.amazonaws.com/${bucket}/${a.Key}`
  }));
};

module.exports = buildPublicLinkList;
