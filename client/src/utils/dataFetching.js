/**
 * POST Fetch Method
 * 
 * @param {String} route
 * @param {Object} data
 * @returns {Promise}
*/
export function post(route, data) {
  const postHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  };

  return fetch(route, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify(data)
  });
}

/**
 * Fetch All Data For App
 * 
 * @param {Object} route
 * @returns {Promise}
*/
export function fetchAllDataForApp(routes) {
  return Promise.all([
    fetch(routes.conversations.all).then(res => res.json()),
    fetch(routes.collections.all).then(res => res.json()),
    fetch(routes.series.all).then(res => res.json()),
    fetch(routes.blocks.all).then(res => res.json()),
    fetch(routes.messages.all).then(res => res.json())
  ]).then(values => {
    this.setState({
      conversations: values[0],
      collections: values[1],
      series: values[2],
      blocks: values[3],
      messages: values[4]
    });
  });
}
