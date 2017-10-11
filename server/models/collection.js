const {
    getCollections,
    getCollectionById,
    setCollection,
    updateCollection,
    deleteCollection
} = require('../db');

/**
 * Create Collection
 * 
 * @param {Object} collection
 * @return {Promise}
*/
exports.create = collection => {
    return setCollection(collection);
};

/**
 * Update Collection
 * 
 * @param {Object} collection
 * @return {Promise}
*/
exports.update = collection => {
    return updateCollection(collection);
};

/**
 * Get a Collection by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = id => {
    return getCollectionById(id);
};

/**
 * Get all Collections
 *
 * @return {Promise}
*/
exports.all = () => {
    return getCollections();
};

/**
 * Delete Collection
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = id => {
    return deleteCollection(id);
};
