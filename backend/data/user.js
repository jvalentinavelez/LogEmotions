// Import required modules and utilities
const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');
const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

// Add a new user with hashed password
async function add(data) {
    const storedData = await readData();
    // Generate a unique user ID and hash the provided password
    const userId = generateId();
    const hashedPw = await hash(data.password, 12);
    if (!storedData.users) {
      storedData.users = [];
    }
    // Add the new user with hashed password and generated ID to the array
    storedData.users.push({ ...data, password: hashedPw, id: userId });
    await writeData(storedData);
    console.log("add");
    console.log(storedData);
    return { id: userId, email: data.email };
}

// Retrieve a user by email
async function get(email) {
    const storedData = await readData();
    if (!storedData.users || storedData.users.length === 0) {
      throw new NotFoundError('Could not find any users.');
    }
  
    const user = storedData.users.find((ev) => ev.email === email);
    if (!user) {
      throw new NotFoundError('Could not find user for email ' + email);
    }
    // Return the found user
    return user;
}

exports.add = add;
exports.get = get;