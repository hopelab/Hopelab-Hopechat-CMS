const REST_PORT = process.env.PORT || 5000;
const FB_GRAPH_ROOT_URL = 'https://graph.facebook.com/v2.6/';

// database keys
const DB_CONVERSATIONS = 'conversation';
const DB_COLLECTIONS = 'collection';
const DB_SERIES = 'series';
const DB_MESSAGES = 'messages';
const DB_BLOCKS = 'blocks';
const DB_MEDIA = 'media';

// data types
const TYPE_CONVERSATION = 'conversation';
const TYPE_COLLECTION = 'collection';
const TYPE_SERIES = 'series';
const TYPE_BLOCK = 'block';
const TYPE_MESSAGE = 'message';
const TYPE_QUESTION = 'question';
const TYPE_ANSWER = 'answer';
const TYPE_IMAGE = 'image';
const TYPE_VIDEO = 'video';

// caching time
const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const ONE_WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7 * 4;

module.exports = {
    REST_PORT,
    FB_GRAPH_ROOT_URL,
    DB_CONVERSATIONS,
    DB_COLLECTIONS,
    DB_SERIES,
    DB_MESSAGES,
    DB_BLOCKS,
    DB_MEDIA,
    TYPE_CONVERSATION,
    TYPE_COLLECTION,
    TYPE_SERIES,
    TYPE_MESSAGE,
    TYPE_QUESTION,
    TYPE_ANSWER,
    TYPE_BLOCK,
    TYPE_IMAGE,
    TYPE_VIDEO,
    ONE_DAY_IN_MILLISECONDS,
    ONE_WEEK_IN_MILLISECONDS
};
