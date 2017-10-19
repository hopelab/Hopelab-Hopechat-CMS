/**
 * CMS Entities
*/
const entities = {
  conversation: 'conversation',
  collection: 'collection',
  series: 'series',
  block: 'block',
  message: 'message'
};

/**
 * Server Route Operations
*/
const operations = {
  create: 'create',
  update: 'update',
  delete: 'delete'
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

  return {
    create: `/${route}${create}`,
    update: `/${route}${update}`,
    all: `/${route}${all}`,
    get: `/${route}${get}`,
    delete: `/${route}${_delete}`
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
    itemEditing: null,
    childEntities: [],
    treeData: {},
    cursor: {}
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
  }
};

const http = {
  getPostHeaders: () => ({
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }),
  post: 'POST'
};

export { entities, forms, initialState, routes, http, operations };
