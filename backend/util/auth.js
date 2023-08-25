const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { NotAuthError } = require('./errors');

// Secret key for token generation and validation
const KEY = 'supersecret';

// Function to create a JSON web token (JWT)
function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: '1h' });
}
// Function to validate a JSON web token (JWT)
function validateJSONToken(token) {
    return verify(token, KEY);
}

// Function to validate a password against its stored hash
function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword);
}

// Middleware to check authentication in incoming requests
function checkAuthMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }
    // Check if authorization header is present
    if (!req.headers.authorization) {
      console.log('NOT AUTH. AUTH HEADER MISSING.');
      return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');
  
    // Ensure authorization header is valid
    if (authFragments.length !== 2) {
      console.log('NOT AUTH. AUTH HEADER INVALID.');
      return next(new NotAuthError('Not authenticated.'));
    }
    // Extract and validate the JWT from the authorization header
    const authToken = authFragments[1];
    try {
      const validatedToken = validateJSONToken(authToken);
      req.token = validatedToken;
    } catch (error) {
      console.log('NOT AUTH. TOKEN INVALID.');
      return next(new NotAuthError('Not authenticated.'));
    }
    next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;