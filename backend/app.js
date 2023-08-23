const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); 

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/logs');
const resummeRoutes = require('./routes/emotions');

//Setup server
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(authRoutes);

app.use('/logs', eventRoutes);
app.use('/emotions', resummeRoutes);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong.';
    res.status(status).json({ message: message });
});

app.listen(8080);