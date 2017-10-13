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
exports.create = block => {
    return setBlock(block);
};

/**
 * Update Block
 * 
 * @param {Object} block
 * @return {Promise}
*/
exports.update = block => {
    return updateBlock(block);
};

/**
 * Get a Block by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = id => {
    return getBlockById(id);
};

/**
 * Get all Blocks
 *
 * @return {Promise}
*/
exports.all = () => {
    return getBlocks();
};

/**
 * Delete Block
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = id => {
    return deleteBlock(id);
};
