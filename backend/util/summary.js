const http = require('http');

const generateSummary = (textToSummarize) => {
  return new Promise((resolve, reject) => {
    const apiKey = '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';
    const prompt = `Generate a summary of the following text:\n"${textToSummarize}"`;

    openai.apiKey = apiKey;

    const requestData = JSON.stringify({
      prompt: prompt,
      max_tokens: 100, // Adjust this value as needed
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/engines/davinci-codex/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const responseData = JSON.parse(data);
        const summary = responseData.choices[0].text.trim();
        resolve(summary);
      });
    });

    req.on('error', (error) => {
      console.error('Error generating summary:', error);
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
};

module.exports = { generateSummary };