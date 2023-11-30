const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.route');

// Init express app
const app = express();

// Enable incoming JSON data
app.use(express.json())

// Endpoints
app.use('/api/v1/users', usersRouter);

module.exports = { app };