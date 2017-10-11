const {
    DB_CONVERSATIONS,
    DB_COLLECTIONS,
    DB_SERIES,
    DB_MESSAGES,
    DB_BLOCKS,
    DB_MEDIA,
    DB_USER_HISTORY,
    ONE_DAY_IN_MILLISECONDS
} = require('./constants');

const helpers = require('./helpers/db');

module.exports = store => {
    /**
     * Get Conversation
     * 
     * @return {Promise<Array>}
    */
    const getConversations = () =>
        new Promise(resolve => {
            store
                .getItem(DB_CONVERSATIONS)
                .then(JSON.parse)
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Get Conversation by ID
     * 
     * @param {String} id
     * @return {Promise<Object>}
    */
    const getConversationById = id =>
        new Promise(resolve => {
            store
                .getItem(DB_CONVERSATIONS)
                .then(JSON.parse)
                .then(helpers.findConversationById(id))
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Set Conversation
     * 
     * @param {Object} conversation
     * @return {Promise<bool>}
    */
    const setConversation = conversation =>
        new Promise(resolve => {
            store
                .getItem(DB_CONVERSATIONS)
                .then(JSON.parse)
                .then(helpers.addNewConversationToList(conversation))
                .then(store.setItem(DB_CONVERSATIONS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Update Conversation
     * 
     * @param {Object} conversation
     * @return {Promise<bool>}
    */
    const updateConversation = conversation =>
        new Promise(resolve => {
            store
                .getItem(DB_CONVERSATIONS)
                .then(JSON.parse)
                .then(helpers.updateConversationInList(conversation))
                .then(store.setItem(DB_CONVERSATIONS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Delete Conversation
     * 
     * @param {String} id
     * @return {Promise<bool>}
    */
    const deleteConversation = id =>
        new Promise(resolve => {
            store
                .getItem(DB_CONVERSATIONS)
                .then(JSON.parse)
                .then(helpers.deleteConversationFromList(id))
                .then(store.setItem(DB_CONVERSATIONS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Get Collection
     * 
     * @return {Promise<Array>}
    */
    const getCollections = () =>
        new Promise(resolve => {
            store
                .getItem(DB_COLLECTIONS)
                .then(JSON.parse)
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Get Collection by ID
     * 
     * @param {String} id
     * @return {Promise<Object>}
    */
    const getCollectionById = id =>
        new Promise(resolve => {
            store
                .getItem(DB_COLLECTIONS)
                .then(JSON.parse)
                .then(helpers.findCollectionById(id))
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Set Collection
     * 
     * @param {Object} collection
     * @return {Promise<bool>}
    */
    const setCollection = collection =>
        new Promise(resolve => {
            store
                .getItem(DB_COLLECTIONS)
                .then(JSON.parse)
                .then(helpers.addNewCollectionToList(collection))
                .then(store.setItem(DB_COLLECTIONS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Update Collection
     * 
     * @param {Object} collection
     * @return {Promise<bool>}
    */
    const updateCollection = collection =>
        new Promise(resolve => {
            store
                .getItem(DB_COLLECTIONS)
                .then(JSON.parse)
                .then(helpers.updateCollectionInList(collection))
                .then(store.setItem(DB_COLLECTIONS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Delete Collection
     * 
     * @param {String} id
     * @return {Promise<bool>}
    */
    const deleteCollection = id =>
        new Promise(resolve => {
            store
                .getItem(DB_COLLECTIONS)
                .then(JSON.parse)
                .then(helpers.deleteCollectionFromList(id))
                .then(store.setItem(DB_COLLECTIONS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Get Series
     * 
     * @return {Promise<Array>}
    */
    const getSeries = () =>
        new Promise(resolve => {
            store
                .getItem(DB_SERIES)
                .then(JSON.parse)
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Get Series by ID
     * 
     * @param {String} id
     * @return {Promise<Object>}
    */
    const getSeriesById = id =>
        new Promise(resolve => {
            store
                .getItem(DB_SERIES)
                .then(JSON.parse)
                .then(helpers.findSeriesById(id))
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Set Series
     * 
     * @param {Object} series
     * @return {Promise<bool>}
    */
    const setSeries = series =>
        new Promise(resolve => {
            store
                .getItem(DB_SERIES)
                .then(JSON.parse)
                .then(helpers.addNewSeriesToList(series))
                .then(store.setItem(DB_SERIES, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Update Series
     * 
     * @param {Object} series
     * @return {Promise<bool>}
    */
    const updateSeries = series =>
        new Promise(resolve => {
            store
                .getItem(DB_SERIES)
                .then(JSON.parse)
                .then(helpers.updateSeriesInList(series))
                .then(store.setItem(DB_SERIES, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Delete Series
     * 
     * @param {String} id
     * @return {Promise<bool>}
    */
    const deleteSeries = id =>
        new Promise(resolve => {
            store
                .getItem(DB_SERIES)
                .then(JSON.parse)
                .then(helpers.deleteSeriesFromList(id))
                .then(store.setItem(DB_SERIES, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Get Messages
     * 
     * @return {Promise<Array>}
    */
    const getMessages = () =>
        new Promise(resolve => {
            store
                .getItem(DB_MESSAGES)
                .then(JSON.parse)
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Get Message by ID
     * 
     * @param {String} id
     * @return {Promise<Object>}
    */
    const getMessageById = id =>
        new Promise(resolve => {
            store
                .getItem(DB_MESSAGES)
                .then(JSON.parse)
                .then(helpers.findMessageById(id))
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Set Message
     * 
     * @param {Object} message
     * @return {Promise<bool>}
    */
    const setMessage = message =>
        new Promise(resolve => {
            store
                .getItem(DB_MESSAGES)
                .then(JSON.parse)
                .then(helpers.addNewMessageToList(message))
                .then(store.setItem(DB_MESSAGES, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Update Message
     * 
     * @param {Object} message
     * @return {Promise<bool>}
    */
    const updateMessage = message =>
        new Promise(resolve => {
            store
                .getItem(DB_MESSAGES)
                .then(JSON.parse)
                .then(helpers.updateMessageInList(message))
                .then(store.setItem(DB_MESSAGES, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Delete Message
     * 
     * @param {String} id
     * @return {Promise<bool>}
    */
    const deleteMessage = id =>
        new Promise(resolve => {
            store
                .getItem(DB_MESSAGES)
                .then(JSON.parse)
                .then(helpers.deleteMessageFromList(id))
                .then(store.setItem(DB_MESSAGES, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Get Blocks
     * 
     * @return {Promise<Array>}
    */
    const getBlocks = () =>
        new Promise(resolve => {
            store
                .getItem(DB_BLOCKS)
                .then(JSON.parse)
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Get Block by ID
     * 
     * @param {String} id
     * @return {Promise<Object>}
    */
    const getBlockById = id =>
        new Promise(resolve => {
            store
                .getItem(DB_BLOCKS)
                .then(JSON.parse)
                .then(helpers.findBlockById(id))
                .then(resolve)
                .catch(console.error);
        });

    /**
     * Set Block
     * 
     * @param {Object} block
     * @return {Promise<bool>}
    */
    const setBlock = block =>
        new Promise(resolve => {
            store
                .getItem(DB_BLOCKS)
                .then(JSON.parse)
                .then(helpers.addNewBlockToList(block))
                .then(store.setItem(DB_BLOCKS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Update Block
     * 
     * @param {Object} block
     * @return {Promise<bool>}
    */
    const updateBlock = block =>
        new Promise(resolve => {
            store
                .getItem(DB_BLOCKS)
                .then(JSON.parse)
                .then(helpers.updateBlockInList(block))
                .then(store.setItem(DB_BLOCKS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Delete Block
     * 
     * @param {String} id
     * @return {Promise<bool>}
    */
    const deleteBlock = id =>
        new Promise(resolve => {
            store
                .getItem(DB_BLOCKS)
                .then(JSON.parse)
                .then(helpers.deleteBlockFromList(id))
                .then(store.setItem(DB_BLOCKS, ONE_DAY_IN_MILLISECONDS))
                .catch(console.error);
        });

    /**
     * Get Media
     * 
     * @return {Promise<Object>}
    */
    const getMedia = () =>
        new Promise(resolve => {
            store
                .getItem(DB_MEDIA)
                .then(JSON.parse)
                .then(resolve)
                .catch(console.error);
        });

    return {
        getConversations,
        getCollections,
        getSeries,
        getMessages,
        getBlocks,
        getMedia,

        getConversationById,
        getCollectionById,
        getSeriesById,
        getBlockById,
        getMessageById,

        setConversation,
        setCollection,
        setSeries,
        setBlock,
        setMessage,

        updateConversation,
        updateCollection,
        updateSeries,
        updateBlock,
        updateMessage,

        deleteConversation,
        deleteCollection,
        deleteSeries,
        deleteBlock,
        deleteMessage
    };
};
