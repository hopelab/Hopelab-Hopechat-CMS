'use strict';

var R = require('ramda');

const typeMap = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp'],
  video: ['avi', 'mp4'],
};

var buildPublicLinkList = function(assets, fileType, region, bucket) {

  let filteredAssets = assets.filter(a => (
    typeMap[fileType] &&
    typeMap[fileType].includes(a.Key.substr(a.Key.lastIndexOf('.') + 1))
  ));

  return filteredAssets.map(a => ({
    key: a.Key.replace(/\.[^/.]+$/, ''),
    url: `https://s3-${region}.amazonaws.com/${bucket}/${a.Key}`
  }));
};

module.exports = {
  buildPublicLinkList,
  typeMap,
};
