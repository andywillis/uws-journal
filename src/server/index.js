const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

// App setup

const app = express();
const applicationName = 'uws-journal';
app.store = {};

app.set('port', (process.env.PORT || 3000));
app.set('root', __dirname);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist')));

const { authorise, getData } = require('./auth');
const processMarkdown = require('./lib/processMarkdown');
const getCredentials = require('./auth/getCredentials');
const createRSS = require('./lib/createRss');

function getJournalData(credentials, token) {
  const fileId = '0BxWypIdOuW0YZ3Nidk16SDZLQzA';
  return new Promise((resolve) => {
    authorise({ credentials, token }, (authentication) => {
      getData(authentication, fileId).then((data) => {
        resolve(data);
      });
    });
  });
}

function storeData(type, data) {
  return new Promise((resolve) => {
    app.store[type] = data;
    resolve();
  });
}

async function init() {
  const { credentials, token } = await getCredentials(applicationName);
  const markdown = await getJournalData(credentials, token);
  const data = await processMarkdown(markdown);
  storeData('journal', data);
  createRSS(data);
}

init();

app.get('/journal', (req, res) => {
  res.json(app.store.journal);
});

app.get('/reload', (req, res) => {
  init();
  res.send('Data reloaded.');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});
