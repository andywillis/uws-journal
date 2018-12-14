/* eslint camelcase: 0 */

const fs = require('fs');
const { google } = require('googleapis');

function getCredentials(appName) {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'production') {
      resolve({
        credentials: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_url: process.env.REDIRECT_URL
        },
        token: {
          access_token: process.env.ACCESS_TOKEN,
          refresh_token: process.env.REFRESH_TOKEN,
          token_type: process.env.TOKEN_TYPE
        }
      });

    } else {

      const HOME_DIR = `${process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE}/.credentials/`;
      const CREDENTIALS_PATH = `${HOME_DIR}${appName}-credentials.json`;
      const TOKEN_PATH = `${HOME_DIR}${appName}-token.json`;

      fs.readFile(`${CREDENTIALS_PATH}`, (err, credentialsData) => {
        fs.readFile(`${TOKEN_PATH}`, (err, tokenData) => {
          if (err) reject(err);
          const credentials = JSON.parse(credentialsData).installed;
          const token = JSON.parse(tokenData);
          resolve({
            credentials: {
              client_id: credentials.client_id,
              client_secret: credentials.client_secret,
              redirect_url: credentials.redirect_uris[0]
            },
            token: {
              access_token: token.access_token,
              refresh_token: token.refresh_token,
              token_type: token.token_type
            }
          });

        });

      });

    }
  });
}

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

module.exports = { authorise, getData, getCredentials };
