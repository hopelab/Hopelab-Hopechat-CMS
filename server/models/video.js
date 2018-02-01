const { getVideos } = require('../db')(require('../utils/store'));

/**
   * Get Image
   *
   * @param {Object} image
   * @return {Promise}
  */
exports.getVideos = getVideos;
