const {
  DB_CONVERSATIONS,
  DB_COLLECTIONS,
  DB_SERIES,
  DB_MESSAGES,
  DB_BLOCKS,
  DB_MEDIA,
  DB_TAG,
  DB_USERS,
  TYPE_MESSAGE,
  TYPE_COLLECTION,
  ONE_DAY_IN_MILLISECONDS,
  SUPPORTED_FILE_TYPES,
} = require('./constants');

const helpers = require('./helpers/db');

const fileUtils = require('./utils/file');

const Facebook = require('./services/facebook');

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

  const updateStart = entity =>
    new Promise(resolve => {
      store
        .getItem(DB_MESSAGES)
        .then(JSON.parse)
        .then(messages => (
          store.getItem(DB_COLLECTIONS)
            .then(JSON.parse)
            .then(collections => ({
              messages, collections
            }))
        ))
        .then(({messages, collections}) => {
          const mapEntity = e => {
            let newEntity = Object.assign({}, e);
            if (
              newEntity.id === entity.id &&
              (
                entity.type === TYPE_MESSAGE ||
                entity.type === TYPE_COLLECTION
              )
            ) {
              newEntity.start = true;
            } else if (
              newEntity.start &&
              newEntity.parent &&
              entity.parent &&
              newEntity.parent.id === entity.parent.id
            ) {
              delete newEntity.start;
            }
            return newEntity;
          };

          let newMessages = messages.map(mapEntity);

          let newCollections = collections.map(mapEntity);

          return {messages: newMessages, collections: newCollections};
        })
        .then(({messages, collections}) => (
          Promise.all([
            store.setItem(DB_MESSAGES, ONE_DAY_IN_MILLISECONDS, messages),
            store.setItem(DB_COLLECTIONS, ONE_DAY_IN_MILLISECONDS, collections)
          ]).then(data => ({messages: data[0], collections: data[1]}))
        ))
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
  const uploadMedia = data =>
    new Promise((resolve, reject) => {
      const file = data.file;
      const StaticAssetsSvc = require('./services/staticAssets/StaticAssets')(
        's3'
      );

      if (!fileUtils.isSupportedFileType(file, SUPPORTED_FILE_TYPES)) {
        let type = file && file.type ? file.type : "unknown";
        reject({
          code: 500,
          message: 'Unsupported image type: ' + type
        });
      }

      return StaticAssetsSvc.saveFile(file.name, file).then(resolve);
    });

  const setVideoMedia = ({key, url}) => ({attachment_id}) =>
    new Promise(resolve => {
      store
        .getItem(DB_MEDIA)
        .then(JSON.parse)
        .then(media => {
          if (!media) { media = {video: []}; }
          if (!media.video || !Array.isArray(media.video)) {
            media.video = [];
          }
          media.video.push({key, url, attachment_id});
          return media;
        })
        .then(store.setItem(DB_MEDIA, ONE_DAY_IN_MILLISECONDS))
        .then(resolve)
        .catch(console.error);
    });

  const uploadToFacebookIfVideo = data =>
    new Promise(resolve => {
      if (data.type !== 'video') {
        return resolve(data);
      }

      return Facebook.uploadAttachment(data)
        .then(setVideoMedia(data))
        .then(resolve);
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
    updateStart,

    getImages,
    uploadMedia,

    uploadToFacebookIfVideo,

    getVideos,

    getTags,
    setTag,

    getUserData,
  };
};
