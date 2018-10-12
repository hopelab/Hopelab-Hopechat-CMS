const {
  DB_CONVERSATIONS,
  DB_SERIES,
  DB_BLOCKS,
  DB_MEDIA,
  TYPE_MESSAGE,
  ONE_DAY_IN_MILLISECONDS,
  SUPPORTED_FILE_TYPES,
  DB_MESSAGE_LIST,
  DB_COLLECTION_LIST,
  TYPE_COLLECTION,
  DB_STUDY,
  MESSAGE_TYPE_VIDEO,
  DB_ORDERS_LIST,
} = require('./constants');

const redisClient = require('./utils/client');

const helpers = require('./helpers/db');
const R = require('ramda');
const {promisify} = require('util');
const getLAsync = promisify(redisClient.lrange).bind(redisClient);

const fileUtils = require('./utils/file');
const { keyFormatMessageId } = require('./utils/messages');
const { keyFormatOrderId } = require('./utils/orders');
const { keyFormatCollectionId } = require('./utils/collections');
const { formatNameCopy } = require('./utils/general');

const Facebook = require('./services/facebook');

const { createNewSingleMsgOrColl } = helpers;

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

  const getCollections = () =>
    getLAsync(DB_COLLECTION_LIST, 0, -1)
      .then(collIds => Promise.all(
        collIds.map(id => getCollectionById(id)))
      )
      .catch(e => console.error(e));

  const setCollection = collection =>
    updateCollection(createNewSingleMsgOrColl(TYPE_COLLECTION, collection))
      .then(c => redisClient.lpush(DB_COLLECTION_LIST, c.id))
      .then(getCollections)
      .catch(console.error);

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

  const getMessages = () =>
    getLAsync(DB_MESSAGE_LIST, 0, -1)
      .then(messageIds => Promise.all(
        messageIds.map(id => getMessageById(id)))
      )
      .catch(console.error);

  const getNameCopyNumber = name =>
    new Promise(resolve => redisClient.incr(formatNameCopy(name), (err, val) => resolve(val)));

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
    updateMessage(createNewSingleMsgOrColl(TYPE_MESSAGE, message))
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

  const deleteMedia = (name, type) =>
    new Promise((resolve, reject) => {
      const StaticAssetsSvc = require('./services/staticAssets/StaticAssets')(
        's3'
      );

      return StaticAssetsSvc.deleteFile(name)
        .then(type === MESSAGE_TYPE_VIDEO ? getVideos : getImages)
        .then(resolve)
        .catch(reject);
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

  const getStudyIds = () =>
    new Promise(resolve => {
      store
        .getItem(DB_STUDY)
        .then(JSON.parse)
        .then(resolve)
        .catch(console.error);
    });
  // createStudyId

  const getOrderById = id => (
    new Promise(resolve => {
      store.getItem(keyFormatOrderId(id))
        .then(order => resolve(JSON.parse(order)))
        .catch(e => {
          // no item found matching cacheKey
          console.error(
            `error: getOrderById - getJSONItemFromCache(order:${id}})`,
            e
          );
          resolve();
        });
    })
  );

  const getOrders = () =>
    getLAsync(DB_ORDERS_LIST, 0, -1)
      .then(orderIds => Promise.all(
        orderIds.map(id => getOrderById(id)))
      )
      .catch(console.error);

  const updateOrder = order =>
    new Promise(resolve => {
      redisClient.set(keyFormatOrderId(order.id), JSON.stringify(order));
      resolve(order);
    });

  const setOrder = order =>
    updateOrder(order)
      .then(order => redisClient.lpush(DB_ORDERS_LIST, order.id))
      .then(getOrders)
      .catch(console.error);

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
    deleteMedia,

    uploadToFacebookIfVideo,

    getVideos,

    getStudyIds,
    getNameCopyNumber,

    getOrders,
    getOrderById,
    setOrder,
    updateOrder,

  };
};
