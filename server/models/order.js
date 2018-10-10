const {
  getOrders,
  getOrderById,
  setOrder,
  updateOrder,
} = require('../db')(require('../utils/store'));

/**
 * Create Message
 *
 * @param {Object} message
 * @return {Promise}
*/
exports.create = setOrder;

/**
 * Update Message
 *
 * @param {Object} message
 * @return {Promise}
*/
exports.update = updateOrder;

/**
 * Get a Message by ID
 *
 * @param {String} id
 * @return {Promise}
*/
exports.get = getOrderById;

/**
 * Get all Messages
 *
 * @return {Promise}
*/
exports.all = getOrders;
