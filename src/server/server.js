const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const { authorise, getData } = require('./auth');
const { wrangleJournalData } = require('./lib/wrangleData');

const getCredentials = require('./auth/getCredentials');

const app = express();

app.applicationName = 'uws-journal';

app.set('port', (process.env.PORT || 3001));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  const fixedPath = path.resolve(__dirname, '../dist');
  app.use(express.static(fixedPath));
}

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
  console.log(data)
  app.data = data;
}

getCredentials(app.applicationName)
  .then(storeCredentials)
  .then(getJournalData)
  .then(wrangleJournalData)
  .then(storeJournalData);

app.get('/api', (req, res) => {
  res.json(app.data);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

http.createServer(app).listen(app.get('port'));

console.log('Server created on port', app.get('port'));
