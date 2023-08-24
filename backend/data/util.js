const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'usersdb.json');

async function readData() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const data = await fs.writeFile(filePath, '{"users": []}','utf8');
      return { users: [] };
    }
    throw error;
  }
}

async function writeData(data) {
  console.log(filePath);
  try {
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    console.log('fileExists');
    console.log(fileExists);

    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');

    console.log('Data written successfully.');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

exports.readData = readData;
exports.writeData = writeData;