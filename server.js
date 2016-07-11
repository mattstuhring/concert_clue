'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({silent: true});
};

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const ev = require('express-validation');

// create, delete
const session = require('./routes/session');
// create, read, update, delete
const artists = require('./routes/artists');
// create, read, update, delete
const artists_users = require('./routes/artists_users');
// create, read, update, delete
const users = require('./routes/users');

const app = express();

app.disable('x-powered-by');

if(process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');
  app.use(morgan('short'));
};

app.use(bodyParser.json());
// app.use(cookieParser());
app.use(cookieSession({
  name: 'concert-clue',
  secret: process.env.SESSION_SECRET
}));

app.use(express.static(path.join('public')));

app.use(session);
// app.use(artists);
app.use(users);
// app.use(artists_users);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err instanceof ev.ValidationError) {
    return res.status(err.status).json(err);
  }

  if(err.status) {
    console.log(err);
    return res.status(err.status).send(err.message);
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
