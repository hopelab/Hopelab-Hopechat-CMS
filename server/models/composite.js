const R = require('ramda');

const block = require('./block');
const collection = require('./collection');
const conversation = require('./conversation');
const series = require('./series');

exports.createConversation = entity =>
  conversation.create(entity).then(conversations =>
    collection
      .create({
        type: 'collection',
        private: true,
        name: 'default',
        parent: {
          type: 'conversation',
          id: R.last(conversations).id
        }
      })
      .then(collections =>
        series
          .create({
            type: 'series',
            private: true,
            name: 'default',
            parent: {
              type: 'collection',
              id: R.last(collections).id
            }
          })
          .then(allSeries =>
            block
              .create({
                type: 'block',
                private: true,
                name: 'default',
                parent: {
                  type: 'series',
                  id: R.last(allSeries).id
                }
              })
              .then(blocks => ({
                  block: blocks,
                  series: allSeries,
                  collection: collections,
                  conversation: conversations
              }))
          )
      )
  );
