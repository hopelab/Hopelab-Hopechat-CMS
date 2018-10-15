'use strict';

const R = require('ramda');

const isSupportedFileType = (file, fileTypes) =>
  R.path(['type'], file) && fileTypes.includes(file.type.toLowerCase());

const fileSizeExceeds = (file, maxBytes) => file.size > maxBytes;

const isSupportedFont = file => {
  const isTTF = R.propEq('type', 'application/octet-stream'),
    isWoff = R.propEq('type', 'application/font-woff');

  return R.anyPass([isTTF, isWoff])(file);
};

const fileTypeMap = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp'],
  video: ['avi', 'mp4'],
};

const cleanString = url => {
  /* Requires STRING not contain TOKEN */
  const parts = url.split('.');
  return parts.slice(0,-1).join('') + '.' + parts.slice(-1);
};

module.exports = {
  isSupportedFileType,
  isSupportedFont,
  fileSizeExceeds,
  fileTypeMap,
  cleanString,
};
