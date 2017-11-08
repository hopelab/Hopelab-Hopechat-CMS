const {
    uploadImage
  } = require('../db')(require('../utils/store'));
  
  /**
   * Upload Image
   * 
   * @param {Object} image
   * @return {Promise}
  */
  exports.upload = uploadImage;
  