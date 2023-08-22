const bodyParser = require('body-parser');
const express = require('express');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/logs');

//Setup server
const app = express();

const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(authRoutes);

app.use('/logs', eventRoutes);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong.';
    res.status(status).json({ message: message });
});

app.listen(8080);