const R = require('ramda');

const block = require('./block');
const collection = require('./collection');
const conversation = require('./conversation');
const series = require('./series');
const message = require('./message');

const { promiseSerial } = require('../utils/data');

const modelMap = { conversation, collection, series, block, message };

const makeANewCollection = conversations => ({
  type: 'collection',
  private: true,
  name: 'default',
  parent: {
    type: 'conversation',
    id: R.last(conversations).id
  }
});

const makeANewSeries = collections => ({
  type: 'series',
  private: true,
  name: 'default',
  parent: {
    type: 'collection',
    id: R.last(collections).id
  }
});

const makeANewBlock = allSeries => ({
  type: 'block',
  private: true,
  name: 'default',
  parent: {
    type: 'series',
    id: R.last(allSeries).id
  }
});

/**
 * Create a new Conversation and default private descendants
 * 
 * @param {Object} entity
 * @return {Promise}
*/
exports.createConversation = entity =>
  conversation.create(entity).then(conversations =>
    collection.create(makeANewCollection(conversations)).then(collections =>
      series.create(makeANewSeries(collections)).then(allSeries =>
        block.create(makeANewBlock(allSeries)).then(blocks => ({
          block: blocks,
          series: allSeries,
          collection: collections,
          conversation: conversations
        }))
      )
    )
  );

/**
   * Update all Message Pointers Between Two Lists (Old, New)
   * 
   * @param {Object} entityOldNew
   * @return {Array}
  */
function getNewListForSave(entityOldNew) {
  const oldList = R.pluck('oldChild', entityOldNew);
  const newList = R.pluck('newChild', entityOldNew);
  let listToSave = newList;

  oldList.forEach((oldItem, i) => {
    listToSave = listToSave.map((newItem, j) => {
      if (R.pathEq(['next', 'id'], oldItem.id, newItem)) {
        return R.merge(newItem, {
          next: { id: listToSave[i].id, type: listToSave[i].type }
        });
      }

      return newItem;
    });
  });

  return listToSave;
}

/**
 * Copy a Block
 * 
 * @param {Object} parent
 * @param {Array} children
 * @return {Promise}
*/
function copyBlock(parent, children) {
  const childPromises = children.map((oldChild, i) => () => {
    return modelMap[oldChild.type]
      .create(
        R.merge(oldChild, {
          parent: {
            type: parent.type,
            id: parent.id
          },
          id: null,
          name: null
        })
      )
      .then(newChildList => {
        const newChild = R.last(newChildList);

        return {
          oldChild,
          newChild
        };
      })
      .catch(console.error);
  });

  return promiseSerial(childPromises)
    .then(R.uniq)
    .then(newChildren => {
      const listForSave = getNewListForSave(newChildren);
      const updatePromises = listForSave.map((entityToUpdate, i) => () =>
        modelMap[entityToUpdate.type].update(R.clone(entityToUpdate))
      );

      return promiseSerial(updatePromises)
        .then(R.uniq)
        .then(updatedChildren =>
          updatedChildren.filter((child, i) =>
            R.find(R.propEq('id', child.id))(listForSave)
          )
        )
        .catch(console.error);
    });
}

/**
 * Copy the Parent Entity
 * 
 * @param {Object} parent
 * @return {Promise}
*/
function copyParent(parent) {
  return modelMap[parent.type].create(parent);
}

/**
 * Construct Return Value By Entity Key
 * 
 * @param {Object}
 * @return {Function}
*/
const constructReturnCopiedValues = parent => children =>
  children.concat(parent).reduce(
    (prev, curr) =>
      R.merge(prev, {
        [curr.type]: prev[curr.type] ? prev[curr.type].concat(curr) : [curr]
      }),
    {}
  );

/**
   * Copy an Entity and all it's descendants
   * 
   * @param {Object} data
   * @return {Promise}
  */
exports.copyEntityAndAllChildren = data => {
  return copyParent(data.parent)
    .then(parentList => {
      const newParent = R.last(parentList);

      return copyBlock(newParent, data.children)
        .then(constructReturnCopiedValues(newParent))
        .catch(console.error);
    })
    .catch(console.error);
};
