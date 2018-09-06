const {
  DB_CONVERSATIONS,
  DB_SERIES,
  DB_BLOCKS,
  DB_MEDIA,
  DB_TAG,
  TYPE_MESSAGE,
  ONE_DAY_IN_MILLISECONDS,
  SUPPORTED_FILE_TYPES,
  DB_MESSAGE_LIST,
  DB_COLLECTION_LIST,
  TYPE_COLLECTION
} = require('./constants');

const redisClient = require('./utils/client');

const helpers = require('./helpers/db');
const R = require('ramda');
const {promisify} = require('util');
const getLAsync = promisify(redisClient.lrange).bind(redisClient);

const fileUtils = require('./utils/file');
const { keyFormatMessageId } = require('./utils/messages');
const { keyFormatCollectionId } = require('./utils/collections');

const Facebook = require('./services/facebook');

const { createNewEntity, createNewSingleEntity } = helpers;

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

  const getCollectionById = id => (
    new Promise(resolve => {
      store.getItem(keyFormatCollectionId(id))
        .then(msg => resolve(JSON.parse(msg)))
        .catch(e => {
          // no item found matching cacheKey
          console.error(
            `error: getMessageById - getJSONItemFromCache(collection:${id}})`,
            e
          );
          resolve();
        });
    })
  );

  const getCollections = () =>  new Promise(resolve => {
    getLAsync(DB_COLLECTION_LIST, 0, -1)
      .then(collIds => {
        resolve(Promise.all(
          collIds.map(id => getCollectionById(id)))
        );
      })
      .catch(e => console.error(e));
  });

  const setCollection = collection =>
    updateCollection(createNewEntity(TYPE_COLLECTION, collection))
      .then(c => redisClient.lpush(DB_COLLECTION_LIST, c.id));


    /**
       * Update Collection
       *
       * @param {Object} collection
       * @return {Promise<bool>}
      */
  const updateCollection = collection =>
    new Promise(resolve => {
      redisClient.set(keyFormatCollectionId(collection.id), JSON.stringify(collection));
      resolve(collection);
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

  const getMessageById = id => (
    new Promise(resolve => {
      store.getItem(keyFormatMessageId(id))
        .then(msg => resolve(JSON.parse(msg)))
        .catch(e => {
          // no item found matching cacheKey
          console.error(
            `error: getMessageById - getJSONItemFromCache(message:${id}})`,
            e
          );
          resolve();
        });
    })
  );

  const getMessages = () =>  new Promise(resolve => {
    getLAsync(DB_MESSAGE_LIST, 0, -1)
      .then(messageIds => {
        resolve(Promise.all(
          messageIds.map(id => getMessageById(id)))
        );
      })
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
      redisClient.set(keyFormatMessageId(message.id), JSON.stringify(message));
      resolve(message);
    });

  // TODO: not ideal to call getMessages 2x. We will deprecate this method when we allow
  // less nonsensical names to be chosen
  const setMessage = message =>
    getMessages()
      .then(createNewSingleEntity(TYPE_MESSAGE, message))
      .then(updateMessage)
      .then(m => redisClient.lpush(DB_MESSAGE_LIST, m.id))
      .then(getMessages)
      .catch(console.error);


  const updateStart = ({ newStart: n, prevStart: p }) =>
    new Promise(resolve => {
      const newStart = Object.assign({}, {...n}, { start: true});
      const prevStart = Object.assign({}, {...p}, { start: false});
      const promises = [
        R.equals(newStart.type, TYPE_MESSAGE) ? updateMessage(newStart) : updateCollection(newStart),
        R.equals(prevStart.type, TYPE_MESSAGE) ? updateMessage(prevStart) : updateCollection(prevStart),
      ];
      Promise.all(promises).then(() => {
        Promise.all([getMessages(), getCollections()])
          .then(data => ({messages: data[0], collections: data[1]}))
          .then(resolve)
          .catch(console.error);
      })
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
  };
};
