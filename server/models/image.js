const { getImages, uploadImage } = require('../db')(require('../utils/store'));

/**
   * Upload Image
   * 
   * @param {Object} image
   * @return {Promise}
  */
exports.getImages = getImages;

/**
   * Upload Image
   * 
   * @param {Object} image
   * @return {Promise}
  */
exports.upload = uploadImage;
