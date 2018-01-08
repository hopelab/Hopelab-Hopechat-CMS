const { getUserData } = require('../db')(require('../utils/store'));

/**
   * Get Tags
   *
   * @return {Promise}
  */
exports.all = getUserData;
