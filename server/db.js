const {
  DB_CONVERSATIONS,
  DB_COLLECTIONS,
  DB_SERIES,
  DB_MESSAGES,
  DB_BLOCKS,
  DB_MEDIA,
  DB_TAG,
  DB_USERS,
  ONE_DAY_IN_MILLISECONDS,
  SUPPORTED_FILE_TYPES,
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
        .then(helpers.findEntityById(id))
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
        .then(
          helpers.createNewEntity(
            helpers.entityTypes.conversation,
            conversation
          )
        )
        .then(store.setItem(DB_CONVERSATIONS, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.updateEntityInList(conversation))
        .then(store.setItem(DB_CONVERSATIONS, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.findEntityById(id))
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
        .then(
          helpers.createNewEntity(helpers.entityTypes.collection, collection)
        )
        .then(store.setItem(DB_COLLECTIONS, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.updateEntityInList(collection))
        .then(store.setItem(DB_COLLECTIONS, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.findEntityById(id))
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
        .then(helpers.createNewEntity(helpers.entityTypes.series, series))
        .then(store.setItem(DB_SERIES, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.updateEntityInList(series))
        .then(store.setItem(DB_SERIES, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.findEntityById(id))
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
        .then(helpers.createNewEntity(helpers.entityTypes.message, message))
        .then(store.setItem(DB_MESSAGES, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.updateEntityInList(message))
        .then(store.setItem(DB_MESSAGES, ONE_DAY_IN_MILLISECONDS))
        .then(() => getMessageById(message.id))
        .then(resolve)
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
        .then(helpers.findEntityById(id))
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
        .then(helpers.createNewEntity(helpers.entityTypes.block, block))
        .then(store.setItem(DB_BLOCKS, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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
        .then(helpers.updateEntityInList(block))
        .then(store.setItem(DB_BLOCKS, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
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

  /**
     * Get Files
     *
     * @return {Promise<Object>}
    */
  const getImages = () =>
    new Promise(resolve => {
      const StaticAssetsSvc = require('./services/staticAssets/StaticAssets')(
        's3'
      );

      return StaticAssetsSvc.getFiles('image').then(resolve);
    });

  /**
     * Upload Image
     *
     * @return {Promise<Object>}
    */
  const uploadImage = data =>
    new Promise((resolve, reject) => {
      const file = data.file;
      const fileUtils = require('./utils/file');
      const StaticAssetsSvc = require('./services/staticAssets/StaticAssets')(
        's3'
      );

      if (!fileUtils.isSupportedFileType(file, SUPPORTED_FILE_TYPES)) {
        let type = !!file ? file.type : "unknown";
        reject({
          code: 500,
          message: 'Unsupported image type: ' + type
        });
      }

      if (fileUtils.fileSizeExceeds(file, 5000000000)) {
        reject({
          code: 500,
          message: 'Image is too large. Please use an image under 5Mb.'
        });
      }

      return StaticAssetsSvc.saveFile(file.name, file).then(resolve);
    });

  const getVideos = () =>
    new Promise(resolve => {
      const StaticAssetsSvc = require('./services/staticAssets/StaticAssets')(
        's3'
      );

      return StaticAssetsSvc.getFiles('video').then(resolve);
    });

  /**
     * Get Tags
     *
     * @return {Promise<Object>}
    */
  const getTags = () =>
    new Promise(resolve => {
      store
        .getItem(DB_TAG)
        .then(JSON.parse)
        .then(resolve)
        .catch(console.error);
    });

  /**
   * Set Tag
   *
   * @param {Object} tag
   * @return {Promise<bool>}
  */
  const setTag = tag =>
    new Promise(resolve => {
      store
        .getItem(DB_TAG)
        .then(JSON.parse)
        .then(helpers.createNewEntity(helpers.entityTypes.tag, tag))
        .then(store.setItem(DB_TAG, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
        .catch(console.error);
    });

  const getUserData = () =>
    new Promise(resolve => {
      store
        .getItem(DB_USERS)
        .then(JSON.parse)
        .then(helpers.mapUserHistory)
        .then(resolve)
        .catch(console.error);
    })

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

    getImages,
    uploadImage,

    getTags,
    setTag,

    getUserData,
  };
};
