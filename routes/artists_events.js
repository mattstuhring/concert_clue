'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/joiartists_events');
const genEventsQuery = require('../modules/utils').genEventsQuery;
var rp = require('request-promise');

router.get('/artists/events', ev(validations.get), (req, res, next) => {
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
console.log(options);
  rp(options)
    .then((events) => {
      if (events.length === 0) {
        const err = new Error();

        err.status = 404;

        throw err;
      }
      
      return res.send(events);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        err.status = 404;
      }

      next(err);
    });
});


module.exports = router;

/* handling get request to ./artists/events

A properly formed get request to /artist/events must be an array of artists names in the body and city, state, and radius.

The body will simply JSON.parse()  it will be a jsonrequest as the body.  we'll do some stringifcation and

if we don't receive a properly formed body in the request, we'll respond with a 401 error.

*/
