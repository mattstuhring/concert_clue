'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

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
const usersArtists = require('./routes/users_artists');
const users = require('./routes/users');
const artistsEvents = require('./routes/artists_events');

const app = express();

app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');

  app.use(morgan('short'));
}

app.use(bodyParser.json());
app.use(cookieSession({
  name: 'concert-clue',
  secret: process.env.SESSION_SECRET
}));

app.use(express.static(path.join('public')));

app.use(session);
app.use(artist);
app.use(users);
app.use(artistsEvents);
app.use(usersArtists);

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err instanceof ev.ValidationError) {
    return res.status(err.status).json(err);
  }

  if (err.status || err.statusCode || err.output && err.output.statusCode) {
    return res
      .status(err.status || err.statusCode || err.output.statusCode)
      .set('Content-Type', 'plain/text')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
