const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/database');

mongoose.Promise = global.Promise;
// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to DB ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('DB error ' + err);
});

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', require('./routes/users'));
app.use('/roadmaps', require('./routes/roadmaps'));

// Start the server
const port = process.env.PORT || 5000
app.listen(port);
console.log(`Server listening at ${port}`);

module.exports = app;
