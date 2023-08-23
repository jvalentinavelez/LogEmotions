const express = require('express');
require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();

const apiKey = process.env.OPENAI_API_KEY; 

const configuration = new Configuration({
    apiKey: apiKey,
});


const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
    const emotions = req.body.emotions; // Registros de emociones enviados desde el frontend
    const emotionsText = emotions.join('\n'); // Convierte los registros en un texto

    // Genera el resumen utilizando OpenAI
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize the emotions:\n${emotionsText}\n\nSummary:`,
      max_tokens: 60,
    });

    //console.log(response);

    const summary = response.data.choices[0].text.trim();
    res.json({ success: true, summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    //console.error('Error generating summary:', error.response.statusText);
    res.status(500).json({ success: false, message: 'Failed to generate summary.' });
  }
});

module.exports = router;