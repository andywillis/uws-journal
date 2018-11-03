/* eslint camelcase: 0 */

const { google } = require('googleapis');

function authorise({ credentials, token }, callback) {
  const { client_secret, client_id, redirect_url } = credentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_url);
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

function getData(auth, fileId) {
  const drive = google.drive('v3');
  return new Promise((resolve, reject) => {
    drive.files.get({
      auth,
      fileId,
      alt: 'media'
    }, (err, data) => {
      if (err) reject(err);
      resolve(data.data);
    });
  });
}

module.exports = { authorise, getData };
