const express = require('express');
// Load environment variables from .env file
require('dotenv').config();

// Import OpenAI Api components
const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();

// Get API key from environment variables
const apiKey = process.env.OPENAI_API_KEY; 
// Configure OpenAI API using the obtained API key
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// Route to handle emotion summaries
router.post('/', async (req, res) => {
  try {
    const emotions = req.body.emotions; 
    const emotionsText = emotions.join('\n'); 

    let summary = ''; 

    try {
      // Generate a summary using OpenAI
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Summarize the emotions:\n${emotionsText}\n\nSummary:`,
        max_tokens: 60,
      });

      // Extract and clean up the generated summary
      summary = response.data.choices[0].text.trim();

  } catch (apiError) {
      console.error('Error generating summary:', apiError);
  }

  res.json({ success: true, summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ success: false, message: 'Failed to generate summary.' });
  }
});

module.exports = router;