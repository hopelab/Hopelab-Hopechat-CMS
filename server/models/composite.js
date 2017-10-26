const R = require('ramda');

const block = require('./block');
const collection = require('./collection');
const conversation = require('./conversation');
const series = require('./series');

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
