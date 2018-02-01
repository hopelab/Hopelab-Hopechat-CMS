const {
  uploadMedia
} = require('../db')(require('../utils/store'));

/**
   * Upload Media
   *
   * @param {Object} image or video
   * @return {Promise}
  */
exports.upload = uploadMedia;
