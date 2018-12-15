const fs = require('fs');
const { google } = require('googleapis');

function writeFile(data, filePath, options) {
  return new Promise((resolve, reject) => {
    const f = fs.createWriteStream(filePath, options);
    f.write(data);
    f.end();
    f.on('finish', () => resolve());
    f.on('error', err => reject(err));
  });
}

function verifyFolderExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err) {
        fs.mkdir(path, (err) => {
          if (err) reject(err);
          resolve();
        });
      }
      resolve();
    });
  });
}

function getDriveData(auth, fileId) {
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

module.exports = {
  getDriveData, writeFile, verifyFolderExists
};
