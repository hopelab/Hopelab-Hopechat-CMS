const {
  getMessages,
  getMessageById,
  setMessage,
  updateMessage,
  deleteMessage
} = require('../db')(require('../utils/store'));

/**
 * Create Message
 * 
 * @param {Object} message
 * @return {Promise}
*/
exports.create = setMessage;

/**
 * Update Message
 * 
 * @param {Object} message
 * @return {Promise}
*/
exports.update = updateMessage;

/**
 * Get a Message by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = getMessageById;

/**
 * Get all Messages
 *
 * @return {Promise}
*/
exports.all = getMessages;

/**
 * Delete Message
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = deleteMessage;
