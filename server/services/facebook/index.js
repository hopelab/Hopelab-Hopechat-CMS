const config = require('config');
const request = require('request');
const { FB_GRAPH_ROOT_URL } = require('../../constants');

const createMessagePayload = (url, type) => ({
  message: {
    attachment: {
      type,
      payload: {
        is_reusable: true,
        url
      }
    }
  }
});

const uploadAttachment = ({url, type}) => {
  return new Promise((resolve, reject) => {
    request(
        {
            uri: `${FB_GRAPH_ROOT_URL}me/message_attachments`,
            qs: { access_token: config.facebook.fbPageAccessToken },
            method: 'POST',
            json: createMessagePayload(url, type)
        },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                return resolve(body);
            } else {
                console.error('Unable to send message.');
                console.error(response);
                console.error(error);

                reject(error);
            }
        }
    );
  });
};

module.exports = {
  uploadAttachment
};
