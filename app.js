const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3500;

/*
================================================================================
MIDDLEWARE
================================================================================
*/

// logger
app.use(logger);

// error handler
app.use(errorHandler);

/*
================================================================================
ROUTE REGISTRATION
================================================================================
*/

app.use('/', require('./routes/root'));

app.use('/diapers', require('./routes/api/diapers'));

// catchall
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
  if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
