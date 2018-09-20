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

module.exports = {
  promiseSerial,
  apiErrorResponse
};
