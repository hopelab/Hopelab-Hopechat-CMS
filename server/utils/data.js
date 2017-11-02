/**
 * Resolve An Array of Promises Sequentially
 * 
 * @param {Array} functions
 * @return {Array}
*/
exports.promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );
