import * as R from 'ramda';

/**
 * CMS Entities
*/
const entities = {
  conversation: 'conversation',
  collection: 'collection',
  series: 'series',
  block: 'block',
  message: 'message',
  image: 'image',
  video: 'video',
  orders: 'orders',
};

/**
 * Entities Copying Map
*/
const entitiesForCopy = {
  [entities.conversation]: [],
  [entities.collection]: [],
  [entities.series]: [entities.collection],
  [entities.block]: [entities.series],
  [entities.message]: [],
};

/**
 * UI keys to strip on save/copy
*/
const keysToRemove = ['active', 'children', 'expand', 'toggled'];

/**
 * Server Route Operations
*/
const operations = {
  create: 'create',
  update: 'update',
  delete: 'delete',
  copy: 'copy',
};

/**
 * Config for each entity form
*/
const forms = {
  conversation: {
    fields: ['name', 'live', 'children', 'study'],
    children: ['message', 'collection'],
  },
  collection: {
    fields: ['name', 'rules', 'children'],
    children: ['series'],
    rules: ['random', 'sequential'],
  },
  series: {
    fields: ['name', 'rules', 'children'],
    children: ['block'],
    rules: ['random', 'sequential'],
  },
  block: {
    fields: ['name', 'children'],
    children: ['message'],
  },
  message: {
    fields: ['name'],
    children: [],
  },
};

/**
 * Config for server routes
*/
function getRoutes(route) {
  const create = '/create';
  const update = '/update';
  const all = '/all';
  const get = '/';
  const _delete = '/delete'; // eslint-disable-line no-underscore-dangle
  const copy = '/copy';

  return {
    create: `/${route}${create}`,
    update: `/${route}${update}`,
    all: `/${route}${all}`,
    get: `/${route}${get}`,
    delete: `/${route}${_delete}`,
    copy: `/${route}${copy}`,
  };
}

/**
 * All Server Route Listings
*/
const routes = {
  conversation: {
    ...getRoutes('conversations'),
  },
  collection: {
    ...getRoutes('collections'),
  },
  series: {
    ...getRoutes('series'),
  },
  block: {
    ...getRoutes('blocks'),
  },
  message: {
    ...getRoutes('messages'),
  },
  image: {
    ...getRoutes('images'),
  },
  video: {
    ...getRoutes('videos'),
  },
  orders: {
    ...getRoutes('orders'),
  },
};

const TYPE_CONVERSATION = 'conversation';
const TYPE_COLLECTION = 'collection';
const TYPE_SERIES = 'series';
const TYPE_BLOCK = 'block';
const TYPE_MESSAGE = 'message';
const MESSAGE_TYPE_QUESTION = 'question';
const MESSAGE_TYPE_QUESTION_WITH_REPLIES = 'questionWithReplies';
const MESSAGE_TYPE_TEXT = 'text';
const MESSAGE_TYPE_ANSWER = 'answer';
const MESSAGE_TYPE_IMAGE = 'image';
const MESSAGE_TYPE_VIDEO = 'video';
const MESSAGE_TYPE_TRANSITION = 'transition';

const END_OF_CONVERSATION_ID = 'END-OF-CONVERSATION-ID';

const QUICK_REPLY_MAX_LENGTH = 20;

const messageTypes = [
  { id: MESSAGE_TYPE_TEXT, display: 'Text' },
  { id: MESSAGE_TYPE_QUESTION, display: 'Question' },
  { id: MESSAGE_TYPE_QUESTION_WITH_REPLIES, display: 'Question + Replies' },
  { id: MESSAGE_TYPE_IMAGE, display: 'Image' },
  { id: MESSAGE_TYPE_VIDEO, display: 'Video' },
  { id: MESSAGE_TYPE_TRANSITION, display: 'Transition' },
];

/**
 * Initial State for pieces of UI state
*/
const initialState = {
  App: {
    initialLoad: true,
    conversation: [],
    collection: [],
    series: [],
    block: [],
    message: [],
    image: [],
    video: [],
    orders: [],
    itemEditing: null,
    addingImages: false,
    cursor: {},
    mediaUpload: { showModal: false, status: '' },
    showImageModal: false,
    imageUploadStatus: '',
    showStudyIdView: false,
    loading: false,
    readOnly: false,
  },

  conversation: {
    type: entities.conversation,
    name: '',
  },

  collection: {
    type: entities.collection,
    name: '',
    conversationId: '',
  },

  series: {
    type: entities.series,
    name: '',
    collectionId: '',
  },

  block: {
    type: entities.block,
    name: '',
    seriesId: '',
  },

  message: {
    type: entities.message,
    name: '',
    blockId: '',
  },
};

// prettier-ignore
const http = {
  getPostHeaders: () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  makeCommonFetchOptions: options =>
    R.merge(options, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.sessionStorage.getItem('basicAuthString')}`,
      },
    }),
  makeUploadFetchOptions: options =>
    R.merge(options, {
      headers: {
        Authorization: `Basic ${window.sessionStorage.getItem('basicAuthString')}`,
      },
    }),
  post: 'POST',
};

const ITEMS = {
  CONVERSATION_ITEM: 'conversationItem',
  CONVERSATION_ITEM_CONTAINER: 'conversationItemContainer',
  FIRST_ITEM_SELECT: 'firstItemSelect',
};

export {
  entities,
  entitiesForCopy,
  forms,
  initialState,
  routes,
  http,
  operations,
  keysToRemove,
  messageTypes,
  TYPE_CONVERSATION,
  TYPE_COLLECTION,
  TYPE_SERIES,
  TYPE_BLOCK,
  TYPE_MESSAGE,
  MESSAGE_TYPE_QUESTION,
  MESSAGE_TYPE_QUESTION_WITH_REPLIES,
  MESSAGE_TYPE_TEXT,
  MESSAGE_TYPE_ANSWER,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_VIDEO,
  MESSAGE_TYPE_TRANSITION,
  QUICK_REPLY_MAX_LENGTH,
  END_OF_CONVERSATION_ID,
  ITEMS,
};
