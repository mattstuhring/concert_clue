'use strict'

if (process.env.NODE_ENV !== 'productioin') {
  require('dotenv').config({silent: true});
};

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const artists = require('./routes/artists');
const artists_users = require('./routes/artists_users');
const users = require('./routes/users');

const app = express();

app.disable('x-powered-by');

if(process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');
  app.use(morgan('short'));
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'concert-clue',
  secret process.env.SESSION_SECRET
}));

app.use(express.static(path.join('public')));

app.use(artists);
app.use(users);
app.use(artists_users);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if(err.status) {
    return res.status(err.status).send(err);
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
