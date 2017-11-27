const { getTags, setTag } = require('../db')(require('../utils/store'));

/**
   * Get Tags
   * 
   * @return {Promise}
  */
exports.all = getTags;

/**
   * Add Tag
   * 
   * @param {Object} tag
   * @return {Promise}
  */
exports.add = setTag;
