const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

// getAll
async function getAll() {
    const storedData = await readData();
    if (!storedData.logs) {
      throw new NotFoundError('Could not find any logs.');
    }
    return storedData.logs;
}

// get
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

// add
async function add(data) {
    const storedData = await readData();
    if (!storedData.logs) {
      storedData.logs = [];
    }
    storedData.logs.unshift({ ...data, id: generateId() });
    console.log(storedData.logs);
    await writeData(storedData);
}

// replace
async function replace(id, data) {
    const storedData = await readData();
    if (!storedData.logs || storedData.logs.length === 0) {
      throw new NotFoundError('Could not find any logs.');
    }
  
    const index = storedData.logs.findIndex((log) => log.id === id);
    if (index < 0) {
      throw new NotFoundError('Could not find log for id ' + id);
    }
  
    storedData.logs[index] = { ...data, id };
  
    await writeData(storedData);
}

// remove
async function remove(id) {
    const storedData = await readData();
    const updatedData = storedData.logs.filter((log) => log.id !== id);
    await writeData({ ...storedData, logs: updatedData });
}
  
exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
  