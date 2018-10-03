const shortid = require('shortid');
const R = require('ramda');

const Constants = require('../constants');

const {TYPE_CONVERSATION, TYPE_COLLECTION, TYPE_SERIES, TYPE_BLOCK, TYPE_MESSAGE} = Constants;

const store = require('../utils/store');

// FIXME: this is nuts. we have two different 'type' definitions. TYPE_MESSAGE in constants.js
// is 'message'. Here, it is capitalized. These are not equivalent. I'll need to create a
// way to reconcile the two.
const entityTypes = {
  conversation: TYPE_CONVERSATION,
  collection: TYPE_COLLECTION,
  series: TYPE_SERIES,
  block: TYPE_BLOCK,
  message: TYPE_MESSAGE,
};

const defaultData = {
  [entityTypes.collection]: {
    rule: 'sequential'
  },
  [entityTypes.series]: {
    rule: 'sequential'
  },
  [entityTypes.message]: {
    messageType: 'text'
  }
};

function getDefaultDataForEntityType(type) {
  return defaultData[type];
}

const getDefaultIndexForPublicEntity = R.compose(
  R.inc,
  R.length,
  R.reject(R.prop('private'))
);

const getDBKeyForEntityType = type => {
  let key;
  switch (type) {
    case Constants.TYPE_CONVERSATION:
      key = Constants.DB_CONVERSATIONS;
      break;
    case Constants.TYPE_COLLECTION:
      key = Constants.DB_COLLECTIONS;
      break;
    case Constants.TYPE_SERIES:
      key = Constants.DB_SERIES;
      break;
    case Constants.TYPE_BLOCK:
      key = Constants.DB_BLOCKS;
      break;
    default:
      key = Constants.DB_MESSAGES;
      break;
  }

  return key;
};

// const findNewEntity = newList => entity =>
  // R.compose(R.defaultTo(entity), R.find(R.__, newList), R.propEq('id'))(entity);

const createNewSingleEntity = (type, entity) => entities =>
  Object.assign({}, getDefaultDataForEntityType(type), entity, {
    id: shortid.generate(),
    name:
      entity.name || `${type} ${getDefaultIndexForPublicEntity(entities)}`,
    created: Date.now()
  });

const createNewEntity = (type, entity) => entities =>
  entities.concat(
    Object.assign({}, getDefaultDataForEntityType(type), entity, {
      id: shortid.generate(),
      name:
        entity.name || `${type} ${getDefaultIndexForPublicEntity(entities)}`,
      created: Date.now()
    })
  );

const mapUserHistory = users =>
  users.map(u => ({
    id: u.id,
    history: u.history
  }));

const maybeReplaceWithEntity = newEntity => old =>
  old.id === newEntity.id ? newEntity : old;
const updateEntityInList = entity => entities =>
  entities.map(maybeReplaceWithEntity(entity));

const findEntityById = id => entities => entities.find(e => e.id === id);
const deleteEntityFromList = id => entities =>
  entities.filter(e => e.id !== id);

const maybeRemoveQuickReply = id => entity =>
  R.compose(
    R.ifElse(
      R.length,
      R.assoc('quick_replies', R.__, entity),
      R.always(entity)
    ),
    R.tryCatch(
      R.compose(
        R.map(R.over(R.lensProp('payload'), JSON.parse)),
        R.reject(R.pathEq(['payload', 'id'], id)),
        R.map(R.over(R.lensProp('payload'), JSON.stringify)),
        R.propOr([], 'quick_replies')
      ),
      R.always([])
    )
  )(entity);

const maybeRemoveNext = id =>
  R.ifElse(R.pathEq(['next', 'id'], id), R.omit(['next']), R.identity);

const maybeDeleteLinksForEntity = (type, id) => {
  if (type === Constants.TYPE_COLLECTION) {
    return deleteLinksFromDifferentEntitySets(
      id,
      store,
      Constants.DB_MESSAGES,
      Constants.TYPE_COLLECTION,
      Constants.TYPE_MESSAGE
    );
  }

  if (type === Constants.TYPE_MESSAGE) {
    return deleteLinksFromSameEntitySet(id);
  }

  return entities => entities;
};

const deleteLinksFromSameEntitySet = id =>
  R.compose(
    R.map(maybeRemoveQuickReply(id)),
    R.map(maybeRemoveNext(id))
  );

const deleteLinksFromDifferentEntitySets = (
  id,
  store,
  DB_KEY,
  entitySetOneKey,
  entitySetTwoKey
) => entitySetOne =>
  store
    .getItem(DB_KEY)
    .then(JSON.parse)
    .then(deleteLinksFromSameEntitySet(id))
    .then(store.setItem(DB_KEY, Constants.ONE_DAY_IN_MILLISECONDS))
    .then(entitySetTwo => ({
      [entitySetOneKey]: entitySetOne,
      [entitySetTwoKey]: entitySetTwo
    }));

const getNewestInList = entities =>
  R.head(entities.filter(e => e.created).sort((a, b) => (a.created < b.created ? 1 : -1)));

module.exports = {
  createNewEntity,
  mapUserHistory,
  updateEntityInList,
  findEntityById,
  deleteEntityFromList,
  entityTypes,
  maybeDeleteLinksForEntity,
  deleteLinksFromSameEntitySet,
  deleteLinksFromDifferentEntitySets,
  getDBKeyForEntityType,
  createNewSingleEntity,
  getNewestInList
};
