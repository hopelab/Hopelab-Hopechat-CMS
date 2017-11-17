/**
 * CMS Entities
*/
const entities = {
  conversation: 'conversation',
  collection: 'collection',
  series: 'series',
  block: 'block',
  message: 'message',
  image: 'image'
};

/**
 * Entities Copying Map
*/
const entitiesForCopy = {
  [entities.conversation]: [],
  [entities.collection]: [],
  [entities.series]: [entities.collection],
  [entities.block]: [entities.series],
  [entities.message]: []
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
  copy: 'copy'
};

/**
 * Config for each entity form
*/
const forms = {
  conversation: {
    fields: ['name', 'tags', 'live', 'children'],
    children: [
      'message',
      // 'question',
      // 'quick_reply',
      // 'video',
      // 'image',
      'collection'
    ]
  },
  collection: {
    fields: ['name', 'tags', 'rules', 'children'],
    children: ['series'],
    rules: ['random', 'sequential']
  },
  series: {
    fields: ['name', 'tags', 'rules', 'children'],
    children: ['block'],
    rules: ['random', 'sequential']
  },
  block: {
    fields: ['name', 'tags', 'children'],
    children: ['message'] // 'question', 'quick_reply', 'video', 'image'
  },
  message: {
    fields: ['name'],
    children: []
  }
};

/**
 * Config for server routes
*/
function getRoutes(route) {
  const create = '/create';
  const update = '/update';
  const all = '/all';
  const get = '/';
  const _delete = '/delete';
  const copy = '/copy';

  return {
    create: `/${route}${create}`,
    update: `/${route}${update}`,
    all: `/${route}${all}`,
    get: `/${route}${get}`,
    delete: `/${route}${_delete}`,
    copy: `/${route}${copy}`
  };
}

/**
 * All Server Route Listings
*/
const routes = {
  conversation: {
    ...getRoutes('conversations')
  },
  collection: {
    ...getRoutes('collections')
  },
  series: {
    ...getRoutes('series')
  },
  block: {
    ...getRoutes('blocks')
  },
  message: {
    ...getRoutes('messages')
  }
};

const TYPE_CONVERSATION = 'conversation';
const TYPE_COLLECTION = 'collection';
const TYPE_SERIES = 'series';
const TYPE_BLOCK = 'block';
const TYPE_MESSAGE = 'message';
const TYPE_QUESTION = 'question';
const TYPE_QUESTION_WITH_REPLIES = 'questionWithReplies';
const TYPE_TEXT = 'text';
const TYPE_ANSWER = 'answer';
const TYPE_IMAGE = 'image';
const TYPE_VIDEO = 'video';

/**
 * Initial State for pieces of UI state
*/
const initialState = {
  App: {
    conversation: [],
    collection: [],
    series: [],
    block: [],
    message: [],
    image: [],
    itemEditing: null,
    addingImages: false,
    itemHasBeenEdited: false,
    childEntities: [],
    entitiesCanCopyTo: [],
    treeData: {},
    cursor: {},
    showImageModal: false,
    imageUploadStatus: ''
  },

  conversation: {
    type: entities.conversation,
    name: '',
    userId: '',
    tags: []
  },

  collection: {
    type: entities.collection,
    name: '',
    conversationId: '',
    tags: []
  },

  series: {
    type: entities.series,
    name: '',
    collectionId: '',
    tags: []
  },

  block: {
    type: entities.block,
    name: '',
    seriesId: '',
    tags: []
  },

  message: {
    type: entities.message,
    name: '',
    blockId: '',
    tags: []
  },

  messageTypes: [
    { id: TYPE_TEXT, display: 'Text' },
    { id: TYPE_QUESTION, display: 'Question' },
    { id: TYPE_QUESTION_WITH_REPLIES, display: 'Question with Replies' },
    { id: TYPE_IMAGE, display: 'Image' },
    { id: TYPE_VIDEO, display: 'Video' }
  ]
};

const http = {
  getPostHeaders: () => ({
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }),
  post: 'POST'
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
  TYPE_CONVERSATION,
  TYPE_COLLECTION,
  TYPE_SERIES,
  TYPE_BLOCK,
  TYPE_MESSAGE,
  TYPE_QUESTION,
  TYPE_QUESTION_WITH_REPLIES,
  TYPE_TEXT,
  TYPE_ANSWER,
  TYPE_IMAGE,
  TYPE_VIDEO
};
