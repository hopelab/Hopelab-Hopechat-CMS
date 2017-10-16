import { entities, http } from './config';

/**
 * POST Fetch Method
 * 
 * @param {String} route
 * @param {Object} data
 * @returns {Promise}
*/
export function post(route, data) {
  return fetch(route, {
    method: http.post,
    headers: http.getPostHeaders(),
    body: JSON.stringify(data)
  });
}

/**
 * Create Initial Entities State Data Structure
 * 
 * @param {Array} data
 * @returns {Object}
*/
export function createInitialEntityState(data) {
  return {
    [entities.conversation]: data[0],
    [entities.collection]: data[1],
    [entities.series]: data[2],
    [entities.block]: data[3],
    [entities.message]: data[4]
  };
}

/**
 * Fetch All Data For App
 * 
 * @param {Object} route
 * @returns {Promise}
*/
export function fetchAllDataForApp(routes) {
  return Promise.all([
    fetch(routes.conversation.all).then(res => res.json()),
    fetch(routes.collection.all).then(res => res.json()),
    fetch(routes.series.all).then(res => res.json()),
    fetch(routes.block.all).then(res => res.json()),
    fetch(routes.message.all).then(res => res.json())
  ]);
}

/**
 * Construct POST calls to save child entities
 * 
 * @param {Object} route
 * @returns {Promise}
*/
export function getPostRoutesForChildEntities(entities, routes) {
  return entities.map(e => {
    const action = e.id ? 'update' : 'create';

    return post(routes[e.type][action], e).then(res => res.json());
  });
}

/**
 * Create Tree View Data Structure for UI
 * 
 * @param {Object} data
 * @param {Object} entities
 * @returns {Object}
*/
// TODO: use recursion
export function createTreeView(data, entities) {
  let tree = {
    name: 'hopelab',
    toggled: true,
    children: data[entities.conversation].map(c => c)
  };

  tree.children = tree.children.map(c => {
    return {
      ...c,
      toggled: true,
      children: data[entities.collection].filter(d => {
        return d.parent && d.parent.id === c.id;
      })
    };
  });

  tree.children = tree.children.map(c => {
    return {
      ...c,
      children: c.children.map(d => {
        return {
          ...d,
          toggled: true,
          children: data[entities.series].filter(e => {
            return e.parent && e.parent.id === d.id;
          })
        };
      })
    };
  });

  tree.children = tree.children.map(c => {
    return {
      ...c,
      children: c.children.map(d => {
        return {
          ...d,
          children: d.children.map(f => {
            return {
              ...f,
              toggled: true,
              children: data[entities.block].filter(g => {
                return g.parent && g.parent.id === f.id;
              })
            };
          })
        };
      })
    };
  });

  return tree;
}
