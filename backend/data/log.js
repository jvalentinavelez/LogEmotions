// Import required modules and utilities
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

// Retrieve all logs
async function getAll() {
    const storedData = await readData();
    if (!storedData.logs) {
      //throw new NotFoundError('Could not find any logs.');
      return storedData.logs =  [];
    } else {
      return storedData.logs;
    }
    
}

// Retrieve a log by its ID
async function get(id) {
    const storedData = await readData();
    if (!storedData.logs || storedData.logs.length === 0) {
      throw new NotFoundError('Could not find any logs.');
    }
  
    const log = storedData.logs.find((log) => log.id === id);
    if (!log) {
      throw new NotFoundError('Could not find log for id ' + id);
    }
  
    return log;
}

// Add a new log
async function add(data) {
    const storedData = await readData();
    if (!storedData.logs) {
      storedData.logs = [];
    }
    storedData.logs.unshift({ ...data, id: generateId() });
    
    await writeData(storedData);
}

// Replace an existing log with new data
async function replace(id, data) {
    const storedData = await readData();
    if (!storedData.logs || storedData.logs.length === 0) {
      throw new NotFoundError('Could not find any logs.');
    }
  
    const index = storedData.logs.findIndex((log) => log.id === id);
    if (index < 0) {
      throw new NotFoundError('Could not find log for id ' + id);
    }

    // Replace the log at the specified index with new data
    storedData.logs[index] = { ...data, id };
  
    await writeData(storedData);
}

// Remove a log by its ID
async function remove(id) {
    const storedData = await readData();
    const updatedData = storedData.logs.filter((log) => log.id !== id);
    await writeData({ ...storedData, logs: updatedData });
}
  
// Export the functions for use in other modules
exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
  