const fs = require('fs');

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

module.exports = {
  writeFile, verifyFolderExists
};
