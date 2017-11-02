/**
 * Resolve An Array of Promises Sequentially
 * 
 * @param {Array} functions
 * @return {Array}
*/
const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );

module.exports = {
  promiseSerial
};
