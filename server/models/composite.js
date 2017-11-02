const R = require('ramda');

const block = require('./block');
const collection = require('./collection');
const conversation = require('./conversation');
const series = require('./series');
const message = require('./message');

const { promiseSerial } = require('../utils/data');

const modelMap = {
  conversation: conversation,
  collection: collection,
  series: series,
  block: block,
  message: message
};

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

exports.copyEntityAndAllChildren = data => {
  return modelMap[data.parent.type].create(data.parent).then(parentList => {
    const newParent = R.last(parentList);

    const childPromises = data.children.map((oldChild, i) => {
      return () =>
        modelMap[oldChild.type]
          .create(
            Object.assign({}, oldChild, {
              parent: {
                type: newParent.type,
                id: newParent.id
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
          });
    });

    promiseSerial(childPromises).then(newChildren => {
      let listToSave = [];
      const oldList = R.pluck('oldChild', newChildren);
      const newList = R.pluck('newChild', newChildren);

      oldList.forEach((oldItem, i) => {
        listToSave = newList.map((newItem, j) => {
          if (R.pathEq(['next', 'id'], oldItem.id, newItem)) {
            return Object.assign({}, newItem, {
              next: { id: newList[i].id, type: newList[i].type }
            });
          }

          return newItem;
        });
      });

      // TODO: Bulk Update
      const updatePromises = listToSave.map((entityToUpdate, i) => () =>
        modelMap[entityToUpdate.type].update(Object.assign({}, entityToUpdate))
      );

      promiseSerial(updatePromises).then(updatedChildren => { 
        // TODO: Update UI Response 
      });
    });
  });
};
