const {
  keyFormatMessageId
} = require('./messages');

const {
  keyFormatCollectionId
} = require('./collections');

const { TYPE_MESSAGE } = require('../constants');

/**
 * Resolve An Array of Promises Sequentially
 *
 * @param {Array} functions
 * @return {Array}
*/
const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise
        .then(result =>
          func()
            .then(Array.prototype.concat.bind(result))
            .catch(console.error)
        )
        .catch(console.error),
    Promise.resolve([])
  );

const apiErrorResponse = res => err => { console.error(err); res.status(500).json(err); };

const keyFormatForCollOrMessage = item =>
  item.type === TYPE_MESSAGE ? keyFormatMessageId(item.id) : keyFormatCollectionId(item.id);

module.exports = {
  promiseSerial,
  apiErrorResponse,
  keyFormatForCollOrMessage
};
