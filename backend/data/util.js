const fs = require('node:fs/promises');
const path = require('path');

// Define the path to the JSON file containing the database
const filePath = path.join(__dirname, 'usersdb.json');

// Read data from the database
async function readData() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Handle case when the file does not exist
      const data = await fs.writeFile(filePath, '{"users": []}','utf8');
      return { users: [] };
    }
    throw error;
  }
}

// Write data to the database
async function writeData(data) {
  try {
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    // Write the data to the JSON file
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
    console.log('Data written successfully.');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

exports.readData = readData;
exports.writeData = writeData;