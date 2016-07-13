'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({silent: true});
};

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const ev = require('express-validation');

// Middleware
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// Routes
const session = require('./routes/session');
const artist = require('./routes/artist');
const users_artists = require('./routes/users_artists');
const users = require('./routes/users');
const artists_events = require('./routes/artists_events');

const app = express();

app.disable('x-powered-by');

if(process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');
  app.use(morgan('short'));
};

app.use(bodyParser.json());
app.use(cookieSession({
  name: 'concert-clue',
  secret: process.env.SESSION_SECRET
}));

app.use(express.static(path.join('public')));

app.use(session);
app.use(artist);
app.use(users);
app.use(artists_events);
app.use(users_artists);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err instanceof ev.ValidationError) {
    return res.status(err.status).json(err);
  }

  if(err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'plain/text')
      .send(err.message);
  }

  if(err.statusCode) {
    return res
      .status(err.statusCode)
      .set('Content-Type', 'plain/text')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
