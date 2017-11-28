import R from 'ramda';
import { entities, entitiesForCopy, http, forms } from './config';

/**
 * Bootstrap
 * 
 * Perform any necessary bootstrapping before initial render
*/
export function bootstrap() {
  window.sessionStorage.setItem(
    'basicAuthString',
    process.env.REACT_APP_DEV_BASIC_AUTH_STRING
  );
}

/**
 * POST Fetch Method
 * 
 * @param {String} route
 * @param {Object} data
 * @returns {Promise}
*/
export function post(route, data) {
  return fetch(
    route,
    http.makeCommonFetchOptions({
      method: http.post,
      headers: http.getPostHeaders(),
      body: JSON.stringify(data)
    })
  );
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
    [entities.message]: data[4],
    [entities.image]: data[5],
    [entities.tag]: data[6]
  };
}

/**
 * Create Initial Form Data Structure
 * 
 * @param {Object} props
 * @returns {Object}
*/
export function createInitialFormState(props) {
  return {
    ruleSelection: props.item.rule,
    entityToAdd: R.pathOr('', ['config', 'children', 0])(props)
  };
}

/**
 * Make a copy of an item, removing certain keys
 * 
 * @param {Object} data
 * @param {Array} keys
 * @returns {Object}
*/
export function makeCopyAndRemoveKeys(data, keys) {
  const omitKeys = R.omit(keys);
  return R.ifElse(R.is(Array), R.map(omitKeys), omitKeys)(data);
}

/**
 * Determine if a given entity can be copied
 * 
 * @param {String} entity
 * @returns {bool}
*/
export function entityCanBeCopied(entity) {
  return entity === entities.series || entity === entities.block;
}

/**
 * Get all entity id's that can be copied to
 * 
 * @param {String} entity
 * @param {Object} appState
 * @returns {bool}
*/
export function getEntitiesCanCopyTo(entity, appState) {
  return entitiesForCopy[entity.type].reduce((prev, curr) => {
    return prev.concat(
      ...appState[curr]
        .filter(R.compose(R.not, R.prop('private')))
        .map(({ id, name, type }) => ({ name, link: { type, id } }))
    );
  }, []);
}

/**
 * Throw for empty data array
 * 
 * @param {Array} data
 * @throws data length error
 * @returns {Array}
*/
export function throwIfEmptyArray(data) {
  if (!data || !data.length) {
    throw new Error('Error: API data was empty');
  }

  return data;
}

/**
 * Construct the next UI state for Entity Data
 * 
 * @param {String} type
 * @returns {Object}
*/
export const constructEntityState = type => nextState =>
  Array.isArray(nextState) ? { [type]: nextState } : nextState;

/**
 * Fetch All Data For App
 * 
 * @param {Object} route
 * @returns {Promise}
*/
export function fetchAllDataForApp(routes) {
  return Promise.all([
    fetch(routes.conversation.all, http.makeCommonFetchOptions()).then(res =>
      res.json()
    ),
    fetch(routes.collection.all, http.makeCommonFetchOptions()).then(res =>
      res.json()
    ),
    fetch(routes.series.all, http.makeCommonFetchOptions()).then(res =>
      res.json()
    ),
    fetch(routes.block.all, http.makeCommonFetchOptions()).then(res =>
      res.json()
    ),
    fetch(routes.message.all, http.makeCommonFetchOptions()).then(res =>
      res.json()
    ),
    fetch(routes.image.all, http.makeCommonFetchOptions()).then(res =>
      res.json()
    ),
    fetch(routes.tag.all, http.makeCommonFetchOptions()).then(res => res.json())
  ]).then(throwIfEmptyArray);
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
 * Construct Child Entities For Given Entity
 * 
 * @param {Object} item
 * @param {Object} entities
 * @returns {Array}
*/
export function getChildEntitiesFor(item, entities) {
  if (!item) {
    return [];
  }

  return forms[item.type].children.reduce((prev, curr) => {
    return prev.concat(
      ...R.reject(
        R.prop('private'),
        entities[curr].filter(R.pathEq(['parent', 'id'], item.id))
      )
    );
  }, []);
}

/**
 * Construct Child Entities For Given Entity
 * 
 * @param {Object} tag
 * @param {Array} tags
 * @returns {Boolean}
*/
export function tagExists(tag, tags) {
  return R.findIndex(R.propEq('name', tag.name))(tags) > -1;
}

/**
 * Create Tree View Data Structure for UI
 * 
 * @param {String} active
 * @param {Object} data
 * @param {Object} entities
 * @returns {Object}
*/
// TODO: use recursion
export function createTreeView({ active, data, entities }) {
  let tree = {
    name: 'hopelab',
    toggled: true,
    children: data[entities.conversation].map(c => c)
  };

  tree.children = tree.children.map(c => {
    return {
      ...c,
      toggled: true,
      active: active === c.id,
      isLive: c.isLive,
      children: R.reject(
        R.prop('private'),
        data[entities.collection].filter(R.pathEq(['parent', 'id'], c.id))
      )
    };
  });

  tree.children = tree.children.map(c => {
    return {
      ...c,
      children: c.children.map(d => {
        return {
          ...d,
          toggled: true,
          active: active === d.id,
          children: R.reject(
            R.prop('private'),
            data[entities.series].filter(R.pathEq(['parent', 'id'], d.id))
          )
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
              active: active === f.id,
              children: R.reject(
                R.prop('private'),
                data[entities.block]
                  .filter(R.pathEq(['parent', 'id'], f.id))
                  .map(g => ({
                    ...g,
                    active: active === g.id
                  }))
              )
            };
          })
        };
      })
    };
  });

  return tree;
}
