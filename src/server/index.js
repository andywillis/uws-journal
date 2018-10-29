const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const { authorise, getData } = require('./auth');
const wrangleData = require('./lib/wrangleData');

const getCredentials = require('./auth/getCredentials');

const app = express();

const applicationName = 'uws-journal';

app.set('port', (process.env.PORT || 3001));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

function storeCredentials({ credentials, token }) {
  return new Promise((resolve) => {
    app.credentials = credentials;
    app.token = token;
    resolve();
  });
}

function getJournalData() {
  const { credentials, token } = app;
  const fileId = '0BxWypIdOuW0YZ3Nidk16SDZLQzA';
  return new Promise((resolve) => {
    authorise({ credentials, token }, (authentication) => {
      getData(authentication, fileId).then((data) => {
        resolve(data);
      });
    });
  });
}

function storeJournalData(data) {
  app.dataStore = data;
}

getCredentials(applicationName)
  .then(storeCredentials)
  .then(getJournalData)
  .then(wrangleData)
  .then(storeJournalData);

app.get('/entries', (req, res) => {
  res.json(app.dataStore);
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
// });

http.createServer(app).listen(app.get('port'));

console.log('Server created on port', app.get('port'));
