'use strict';

const R = require('ramda');

const isSupportedFileType = (type, file) =>
  file.type && file.type.indexOf(type + '/') !== -1;

const fileSizeExceeds = (file, maxBytes) => file.size > maxBytes;

const isSupportedFont = file => {
  const isTTF = R.propEq('type', 'application/octet-stream'),
    isWoff = R.propEq('type', 'application/font-woff');

  return R.anyPass([isTTF, isWoff])(file);
};

module.exports = {
  isSupportedFileType,
  isSupportedFont,
  fileSizeExceeds
};
