'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/joiartists_events');
const genEventsQuery = require('../modules/utils').genEventsQuery;
const rp = require('request-promise');

// Req.body should contain: a property called artists which is an array of
 // artist names; optionally city, state, and radius all at once or not at all.
router.post('/artists/events', ev(validations.get), (req, res, next) => {
  const { artists, city, state, radius } = req.body;
  const eventsURL = 'http://api.bandsintown.com/events/search?api_version=2.0';
  const appId = 'CHADTEST';

  if (!artists) {
    const err = new Error();

    err.status = 400;

    return next(err);
  }

  const options = {
    uri: genEventsQuery(eventsURL, artists, appId, city, state, radius),
    json: true
  };

  rp(options)
    .then((events) => res.send(events))
    .catch((err) => {
      if (err.statusCode === 404) {
        err.status = 404;
      }

      next(err);
    });
});

module.exports = router;
