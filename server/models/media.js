const {
  uploadMedia,
  uploadToFacebookIfVideo,
  deleteMedia,
  renameMedia
} = require('../db')(require('../utils/store'));

/**
   * Upload Media
   *
   * @param {Object} image or video
   * @return {Promise}
  */
exports.upload = uploadMedia;

exports.delete = deleteMedia;

exports.rename = renameMedia;

exports.uploadToFacebookIfVideo = uploadToFacebookIfVideo;
