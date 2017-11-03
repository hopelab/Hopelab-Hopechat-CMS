const shortid = require('shortid');
const R = require('ramda');

const entityTypes = {
  conversation: 'Conversation',
  collection: 'Collection',
  series: 'Series',
  block: 'Block',
  message: 'Message'
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

const updateEntityInList = entity => entities =>
  entities.map(e => (e.id === entity.id ? entity : e));

const findEntityById = id => entities => entities.find(e => e.id === id);
const deleteEntityFromList = id => entities =>
  entities.filter(e => e.id !== id);

module.exports = {
  createNewEntity,
  updateEntityInList,
  findEntityById,
  deleteEntityFromList,
  entityTypes
};
