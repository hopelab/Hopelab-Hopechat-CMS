const {
  uploadMedia,
  uploadToFacebookIfVideo,
  deleteMedia
} = require('../db')(require('../utils/store'));

/**
   * Upload Media
   *
   * @param {Object} image or video
   * @return {Promise}
  */
exports.upload = uploadMedia;

exports.delete = deleteMedia;

exports.uploadToFacebookIfVideo = uploadToFacebookIfVideo;
