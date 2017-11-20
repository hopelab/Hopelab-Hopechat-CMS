const shortid = require('shortid');
const R = require('ramda');

const { ONE_DAY_IN_MILLISECONDS } = require('../constants');

const entityTypes = {
  conversation: 'Conversation',
  collection: 'Collection',
  series: 'Series',
  block: 'Block',
  message: 'Message',
  tag: 'tag'
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

const findNewEntity = newList => entity =>
  R.compose(R.defaultTo(entity), R.find(R.__, newList), R.propEq('id'))(entity);

const createNewEntity = (type, entity) => entities =>
  entities.concat(
    Object.assign({}, getDefaultDataForEntityType(type), entity, {
      id: shortid.generate(),
      name:
        entity.name || `${type} ${getDefaultIndexForPublicEntity(entities)}`,
      created: Date.now()
    })
  );

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
    R.map(R.over(R.lensProp('payload'), JSON.stringify)),
    R.reject(R.pathEq(['payload', 'id'], id)),
    R.map(R.over(R.lensProp('payload'), JSON.parse)),
    R.propOr([], 'quick_replies')
  )(entity);

const maybeRemoveNext = id =>
  R.ifElse(R.pathEq(['next', 'id'], id), R.omit(['next']), R.identity);

const deleteLinksFromSameEntitySet = id =>
  R.compose(R.map(maybeRemoveQuickReply(id)), R.map(maybeRemoveNext(id)));

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
    .then(store.setItem(DB_KEY, ONE_DAY_IN_MILLISECONDS))
    .then(entitySetTwo => ({
      [entitySetOneKey]: entitySetOne,
      [entitySetTwoKey]: entitySetTwo
    }));

module.exports = {
  createNewEntity,
  updateEntityInList,
  findEntityById,
  deleteEntityFromList,
  entityTypes,
  deleteLinksFromSameEntitySet,
  deleteLinksFromDifferentEntitySets
};
