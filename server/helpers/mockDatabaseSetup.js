const cacheUtils = require('../utils/store');
const { keyFormatMessageId } = require('../utils/messages');
const { keyFormatCollectionId } = require('../utils/collections');
const conversation = require('../stubs/conversation.json');
const collections = require('../stubs/collection.json');
const series = require('../stubs/series.json');
const messages = require('../stubs/messages.json');
const blocks = require('../stubs/blocks.json');
const media = require('../stubs/media.json');
const {
  DB_CONVERSATIONS,
  DB_COLLECTIONS,
  DB_SERIES,
  DB_MESSAGES,
  DB_BLOCKS,
  DB_MEDIA,
  ONE_WEEK_IN_MILLISECONDS
} = require('../constants');

let promises = [
  cacheUtils.deleteItem(DB_CONVERSATIONS).then(() => {
    cacheUtils.setItem(
      DB_CONVERSATIONS,
      ONE_WEEK_IN_MILLISECONDS,
      conversation
    );
  }),

  cacheUtils.deleteItem(DB_COLLECTIONS).then(() => {
    collections.forEach(coll => {
      cacheUtils.setItem(keyFormatCollectionId(coll.id), ONE_WEEK_IN_MILLISECONDS, coll);
    });
  }),

  cacheUtils.deleteItem(DB_SERIES).then(() => {
    cacheUtils.setItem(DB_SERIES, ONE_WEEK_IN_MILLISECONDS, series);
  }),

  cacheUtils.deleteItem(DB_MESSAGES).then(() => {
    messages.forEach(msg => {
      cacheUtils.setItem(keyFormatMessageId(msg.id), ONE_WEEK_IN_MILLISECONDS, msg);
    });
  }),

  cacheUtils.deleteItem(DB_BLOCKS).then(() => {
    cacheUtils.setItem(DB_BLOCKS, ONE_WEEK_IN_MILLISECONDS, blocks);
  }),
  cacheUtils.deleteItem(DB_MEDIA).then(() => {
    cacheUtils.setItem(DB_MEDIA, ONE_WEEK_IN_MILLISECONDS, media);
  }),
];

Promise.all(promises).then(process.exit);
