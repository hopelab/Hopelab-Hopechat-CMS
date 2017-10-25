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
        parent: {
          type: 'conversation',
          id: conversations[conversations.length - 1].id
        }
      })
      .then(collections =>
        series
          .create({
            type: 'series',
            private: true,
            parent: {
              type: 'collection',
              id: collections[collections.length - 1].id
            }
          })
          .then(allSeries =>
            block
              .create({
                type: 'block',
                private: true,
                parent: {
                  type: 'series',
                  id: allSeries[allSeries.length - 1].id
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
