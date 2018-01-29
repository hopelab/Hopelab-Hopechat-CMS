'use strict';

var R = require('ramda');

var buildPublicLinkList = function(assets, fileType, region, bucket) {
  const typeMap = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp'],
    video: ['avi', 'mp4'],
  };
  let filteredAssets = assets.filter(a => (
    typeMap[fileType] &&
    typeMap[fileType].includes(a.Key.substr(a.Key.lastIndexOf('.') + 1))
  ));

  return filteredAssets.map(a => ({
    key: a.Key.replace(/\.[^/.]+$/, ''),
    url: `https://s3-${region}.amazonaws.com/${bucket}/${a.Key}`
  }));
};

module.exports = buildPublicLinkList;
