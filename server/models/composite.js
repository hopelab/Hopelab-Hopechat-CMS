const R = require('ramda');

const block = require('./block');
const collection = require('./collection');
const conversation = require('./conversation');
const series = require('./series');
const message = require('./message');

const { promiseSerial } = '../utils/data';

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
              }
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

    promiseSerial(childPromises).then(final => {
      const oldList = final.map(R.prop('oldChild'));
      const newList = final.map(R.prop('newChild'));

      oldList.forEach((oldItem, i) => {
        newList.forEach((newItem, j) => {
          if (R.pathEq(['next', 'id'], oldItem.id, newItem)) {
            newItem.next.id = newList[i].id;
          }
        });
      });

      // TODO: Bulk Update
    });
  });
};
