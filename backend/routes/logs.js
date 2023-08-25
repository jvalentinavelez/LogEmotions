const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/log');
const { checkAuth } = require('../util/auth');
const { isValidDate } = require('../util/validation');

require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

// Route to get all logs
router.get('/', async (req, res, next) => {
    try {
      const logs = await getAll();
      res.json({ logs: logs });
    } catch (error) {
      next(error);
    }
});
// Route to get a specific log by ID
router.get('/:id', async (req, res, next) => {
    try {
      const log = await get(req.params.id);
      res.json({ log: log });
    } catch (error) {
      next(error);
    }
});
// Middleware to require authentication for subsequent routes
router.use(checkAuth);

// Route to add a new log
router.post('/', async (req, res, next) => {
    
    const data = req.body;
    let errors = {};

     // Validate the provided date
    if (!isValidDate(data.date)) {
      errors.date = 'Invalid date.';
    }
    // Handle validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: 'Adding the log failed due to validation errors.',
        errors,
      });
    }

    try {
      // Generate a sentiment analysis prompt using OpenAI
      const prompt = `Analyze the sentiment of the following text:\n"${data.notes}"\n\nSentiment:`;
  
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
      });
      const sentimentLabel = response.data.choices[0].text.trim();
  
      // Add sentiment analysis to the data object
      data.sentiment = sentimentLabel;
      await add(data);
  
      res.status(201).json({
        message: 'Log saved.',
        event: data,
      });
  } catch (error) {
      console.error('Error:', error);
  
      // If there's an error (possibly due to no connection to the API), create a log with an empty analysis
      data.sentiment = ''; 
      await add(data);
  
      res.status(201).json({
        message: 'Log saved with empty analysis.',
        event: data,
      });
  }

});

// Route to update an existing log by ID
router.patch('/:id', async (req, res, next) => {
    const data = req.body;
  
    let errors = {};
  
    if (!isValidDate(data.date)) {
      errors.date = 'Invalid date.';
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: 'Updating the log failed due to validation errors.',
        errors,
      });
    }
  
    try {
      await replace(req.params.id, data);
      res.json({ message: 'Log updated.', event: data });
    } catch (error) {
      next(error);
    }
  });

// Route to delete a log by ID
router.delete('/:id', async (req, res, next) => {
    try {
      await remove(req.params.id);
      res.json({ message: 'Log deleted.' });
    } catch (error) {
      next(error);
    }
});

module.exports = router;
