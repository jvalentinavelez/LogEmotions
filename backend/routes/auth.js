const express = require('express');
const { add, get } = require('../data/user');
const { createJSONToken, isValidPassword } = require('../util/auth');
const { isValidEmail, isValidText } = require('../util/validation');

// Create an Express router
const router = express.Router();

// Route for user signup
router.post('/signup', async (req, res, next) => {
    const data = req.body;
    let errors = {};

    // Validate email
    if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email.';
    } else {
      try {
        const existingUser = await get(data.email);
        if (existingUser) {
          errors.email = 'Email exists already.';
        }
      } catch (error) {}
    }

    // Validate password length
    if (!isValidText(data.password, 6)) {
      errors.password = 'Invalid password. Must be at least 6 characters long.';
    }
  
    // Check for validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: 'User signup failed due to validation errors.',
        errors,
      });
    }
  
    try {
      const createdUser = await add(data);
      const authToken = createJSONToken(createdUser.email);
      res
        .status(201)
        .json({ message: 'User created.', user: createdUser, token: authToken });
    } catch (error) {
      //console.log(error);
      next(error); // Pass the error to the next middleware
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    let user;
    try {
      // Fetch user data based on the email
      user = await get(email);
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }
  
    // Validate password
    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: 'Invalid credentials.',
        errors: { credentials: 'Invalid email or password entered.' },
      });
    }

    // Prepare response data for successful login
    const resData = {
      token: createJSONToken(email),
      userId: user.id, 
    };
    
    res.status(200).json(resData);

});
  
module.exports = router;