'use strict';

const { fileTypeMap } = require('../../../../../utils/file');

var buildPublicLinkList = function(assets, fileType, region, bucket) {

  let filteredAssets = assets.filter(a => (
    fileTypeMap[fileType] &&
    fileTypeMap[fileType].includes(a.Key.substr(a.Key.lastIndexOf('.') + 1))
  ));
  return filteredAssets.map(a => ({
    key: a.Key.replace(/\.[^/.]+$/, ''),
    url: `https://s3-${region}.amazonaws.com/${bucket}/${a.Key}`,
    modifiedAt: a.LastModified
  }));
};

module.exports = {
  buildPublicLinkList
};
