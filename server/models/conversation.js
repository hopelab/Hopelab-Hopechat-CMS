const {
    getConversations,
    getConversationById,
    setConversation,
    updateConversation,
    deleteConversation
} = require('../db');

/**
 * Create Conversation
 * 
 * @param {Object} conversation
 * @return {Promise}
*/
exports.create = conversation => {
    return setConversation(conversation);
};

/**
 * Update Conversation
 * 
 * @param {Object} conversation
 * @return {Promise}
*/
exports.update = conversation => {
    return updateConversation(conversation);
};

/**
 * Get a Conversation by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = id => {
    return getConversationById(id);
};

/**
 * Get all Conversations
 *
 * @return {Promise}
*/
exports.all = () => {
    return getConversations();
};

/**
 * Delete Conversation
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = id => {
    return deleteConversation(id);
};
