const REST_PORT = process.env.PORT || 5000;
const FB_GRAPH_ROOT_URL = 'https://graph.facebook.com/v2.6/';

const DB_CONVERSATIONS = 'conversations';
// deprecated
const DB_COLLECTIONS = 'collections';
const DB_COLLECTION_LIST = 'collectionList';

const DB_SERIES = 'series';
//deprecated
const DB_MESSAGES = 'messages';
const DB_MESSAGE_LIST = 'msglist';
const DB_BLOCKS = 'blocks';
const DB_MEDIA = 'media';
const DB_TAG = 'tag';
const DB_USERS = 'users';

const TYPE_CONVERSATION = 'conversation';
const TYPE_COLLECTION = 'collection';
const TYPE_SERIES = 'series';
const TYPE_BLOCK = 'block' ;
const TYPE_MESSAGE =  'message';
const MESSAGE_TYPE_QUESTION = 'question';
const MESSAGE_TYPE_QUESTION_WITH_REPLIES = 'questionWithReplies';
const MESSAGE_TYPE_ANSWER = 'answer';
const MESSAGE_TYPE_IMAGE = 'image';
const MESSAGE_TYPE_VIDEO = 'video';
const TYPE_TAG = 'Tag' || 'tag';

const DEFAULT_NAME = 'default';

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const ONE_WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7 * 4;

const SUPPORTED_FILE_TYPES = ['image/jpeg', 'image/png', 'video/mp4', 'video/x-msvideo'];

module.exports = {
  REST_PORT,
  FB_GRAPH_ROOT_URL,
  DB_CONVERSATIONS,
  DB_COLLECTIONS,
  DB_SERIES,
  DB_MESSAGES,
  DB_BLOCKS,
  DB_MEDIA,
  DB_TAG,
  DB_USERS,
  TYPE_CONVERSATION,
  TYPE_COLLECTION,
  TYPE_SERIES,
  TYPE_MESSAGE,
  MESSAGE_TYPE_QUESTION,
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_ANSWER,
  TYPE_BLOCK,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_VIDEO,
  TYPE_TAG,
  DEFAULT_NAME,
  ONE_DAY_IN_MILLISECONDS,
  ONE_WEEK_IN_MILLISECONDS,
  SUPPORTED_FILE_TYPES,
  DB_MESSAGE_LIST,
  DB_COLLECTION_LIST
};
