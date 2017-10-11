const {
    getMessages,
    getMessageById,
    setMessage,
    updateMessage,
    deleteMessage
} = require('../db');

/**
 * Create Message
 * 
 * @param {Object} message
 * @return {Promise}
*/
exports.create = message => {
    return setMessage(message);
};

/**
 * Update Message
 * 
 * @param {Object} message
 * @return {Promise}
*/
exports.update = message => {
    return updateMessage(message);
};

/**
 * Get a Message by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = id => {
    return getMessageById(id);
};

/**
 * Get all Messages
 *
 * @return {Promise}
*/
exports.all = () => {
    return getMessages();
};

/**
 * Delete Message
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = id => {
    return deleteMessage(id);
};
