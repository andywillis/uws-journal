const fs = require('fs');
const path = require('path');

function buildItems(entries, host) {
  return entries.map((entry) => {
    return (`
      <item>
        <title>${entry.title}</title>
        <link>${host}/entry/${entry.link}</link>
        <description><![CDATA[${entry.cdata}]]></description>
      </item>
    `);
  }).join('');
}

function writeRSS(xml, root) {
  const fileStream = fs.createWriteStream(`${root}/dist/uws.rss`, { flags: 'w', encoding: 'utf-8', mode: '0666' });
  fileStream.write(xml);
  fileStream.end();
  console.log('RSS created');
}

function wrapItems(items) {
  return (`
    <?xml version="1.0"?>
    <rss version="2.0">
      <channel>
        <title>UWS journal feed</title>
        <link>http://uws-journal.herokuapp.com</link>
        <description>UWS journal posts</description>
          ${items}
      </channel>
    </rss>'
  `);
}

function createRSS({ entries }) {
  const root = path.join(__dirname, '../../../');
  const host = 'https://uws-journal.herokuapp.com';
  return new Promise((resolve, reject) => {
    const items = buildItems(entries, host);
    const xml = wrapItems(items);
    writeRSS(xml, root);
    resolve();
  });
}

module.exports = createRSS;
