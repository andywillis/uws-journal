const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const privateKey = fs.readFileSync(path.join(__dirname, 'server.key'));
const certificate = fs.readFileSync(path.join(__dirname, 'server.cert'));

const credentials = { key: privateKey, cert: certificate };

const { authorise, getData } = require('./auth');
const wrangleData = require('./lib/wrangleData');
const getCredentials = require('./auth/getCredentials');
const createRSS = require('./lib/createRss');

const app = express();

const applicationName = 'uws-journal';

app.set('port', (process.env.PORT || 3000));
app.set('root', __dirname);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist')));

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
  return new Promise((resolve) => {
    app.dataStore = data;
    resolve(data);
  });
}

function init() {
  getCredentials(applicationName)
    .then(storeCredentials)
    .then(getJournalData)
    .then(wrangleData)
    .then(storeJournalData)
    .then(createRSS);
}

init();

app.get('/entries', (req, res) => {
  console.log('entries');
  res.json(app.dataStore);
});

app.get('/reload', (req, res) => {
  init();
  console.log('reload');
  res.send('Data reloaded.');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

const server = https.createServer(credentials, app);

server.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});
