const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); 

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/logs');
const resummeRoutes = require('./routes/emotions');

// Setup the Express server
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Set headers to allow cross-origin requests and specify allowed methods and headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(authRoutes);

// Use logs and emotions routes under the following endpoint
app.use('/logs', eventRoutes);
app.use('/emotions', resummeRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong.';
    res.status(status).json({ message: message });
});

app.listen(8080);