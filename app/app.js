const express = require('express');
const app = express();
const cors = require('cors');
const router = require('../router/router');
const options = require('../config/corsOptions');

// cors middleware
app.use(cors(options));

// json payload middleware
app.use(express.json());

// actuator
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Service is up',
  });
});

app.use('/routes', router);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

module.exports = app;
