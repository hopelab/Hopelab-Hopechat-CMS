const block = require('./block');
const collection = require('./collection');
const conversation = require('./conversation');
const series = require('./series');

exports.createConversation = entity => {
  return conversation.create(entity).then(conversations => {
    return collection
      .create({
        type: 'collection',
        parent: {
          type: 'conversation',
          id: conversations[conversations.length - 1].id
        }
      })
      .then(collections => {
        return series
          .create({
            type: 'series',
            parent: {
              type: 'collection',
              id: collections[collections.length - 1].id
            }
          })
          .then(allSeries => {
            return block
              .create({
                type: 'block',
                parent: {
                  type: 'series',
                  id: allSeries[allSeries.length - 1].id
                }
              })
              .then(blocks => {
                return {
                  block: blocks,
                  series: allSeries,
                  collection: collections,
                  conversation: conversations
                };
              });
          });
      });
  });
};
