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
 * Config for each entity form
*/
const forms = {
  conversation: {
    fields: ['name', 'tags', 'live', 'children'],
    children: [
      'message',
      'question',
      'quick_reply',
      'video',
      'image',
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
    children: ['message', 'question', 'quick_reply', 'video', 'image']
  },
  message: {}
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
  conversations: {
    ...getRoutes('conversations')
  },
  collections: {
    ...getRoutes('collections')
  },
  series: {
    ...getRoutes('series')
  },
  blocks: {
    ...getRoutes('blocks')
  },
  messages: {
    ...getRoutes('messages')
  }
};

export { entities, forms, routes };
