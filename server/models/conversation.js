const {
  getConversations,
  getConversationById,
  setConversation,
  updateConversation,
  deleteConversation
} = require('../db')(require('../utils/store'));

/**
 * Create Conversation
 * 
 * @param {Object} conversation
 * @return {Promise}
*/
exports.create = setConversation;

/**
 * Update Conversation
 * 
 * @param {Object} conversation
 * @return {Promise}
*/
exports.update = updateConversation;

/**
 * Get a Conversation by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = getConversationById;

/**
 * Get all Conversations
 *
 * @return {Promise}
*/
exports.all = getConversations;

/**
 * Delete Conversation
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = deleteConversation;
