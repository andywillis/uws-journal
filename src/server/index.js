const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const journalData = require('./data/journal.json');

// App setup

const app = express();
app.store = {};

app.store.journal = journalData;

const applicationName = 'uws-journal';

app.set('port', (process.env.PORT || 3000));
app.set('root', __dirname);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist')));

// Main

// const { getCredentials, authorise } = require('./auth');
// const { getDriveData } = require('./io');
// const processMarkdown = require('./data');
const createRSS = require('./feed');

function getJournalData(credentials, token) {
  const fileId = '0BxWypIdOuW0YZ3Nidk16SDZLQzA';
  return new Promise((resolve) => {
    authorise({ credentials, token }, (authentication) => {
      getDriveData(authentication, fileId).then((data) => {
        resolve(data);
      });
    });
  });
}

async function init() {
  // const { credentials, token } = await getCredentials(applicationName);
  // const markdown = await getJournalData(credentials, token);
  // const data = await processMarkdown(markdown);
  // app.store.journal = data;
  // createRSS(data);
  createRSS(app.store.journal);
}

init();

// Routes

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

// Server

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});
