const {
  getBlocks,
  getBlockById,
  setBlock,
  updateBlock,
  deleteBlock
} = require('../db')(require('../utils/store'));

/**
 * Create Block
 * 
 * @param {Object} block
 * @return {Promise}
*/
exports.create = setBlock;

/**
 * Update Block
 * 
 * @param {Object} block
 * @return {Promise}
*/
exports.update = updateBlock;

/**
 * Get a Block by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = getBlockById;

/**
 * Get all Blocks
 *
 * @return {Promise}
*/
exports.all = getBlocks;
