'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const rp = require('request-promise');
const validations = require('../validations/joiartist');

// Req body must have a single property called artist with an artist name string
router.post('/artist', ev(validations.post), (req, res, next) => {
  const { artist } = req.body;
  const appId = 'CHADTEST';
  const escArtist = encodeURIComponent(artist);
  const prefix = 'http://api.bandsintown.com/artists/';
  const suffix = '.json?api_version=2.0&app_id=';

  knex('artists')
    .select()
    .whereRaw('LOWER(name) = ?', [artist])
    .then((artists) => {
      if (artists.length > 0) {
        const err = new Error();

        err.artist = artists[0];

        throw err;
      }

      const options = {
        uri: `${prefix}${escArtist}${suffix}${appId}`,
        json: true
      };

      return rp(options);
    })
    .then((artistFromBIT) => {
      delete artistFromBIT.tracker_count;
      delete artistFromBIT.upcoming_event_count;

      return res.send(artistFromBIT);
    })
    .catch((err) => {
      if (err.artist) {
        delete err.artist.id;
        delete err.artist.created_at;
        delete err.artist.updated_at;

        return res.send(err.artist);
      }

      throw err;
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        err.status = 404;
      }

      next(err);
    });
});

module.exports = router;
