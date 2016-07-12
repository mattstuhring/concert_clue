'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const rp = require('request-promise');
const validations = require('../validations/joiartist');

router.get('/artists', ev(validations.get), (req, res, next) => {
  const { artist } = req.body;
  const appId = 'CHADTEST';
  const escArtist = encodeURIComponent(artist);

  knex('artists')
    .select()
    .where('name', artist)
    .then((artists) => {
      if (artists.length > 0) {
        console.log(artist[0]);
        return res.send(artists[0]);
      }

      var options = {
        uri: `http://api.bandsintown.com/artists/${escArtist}.json?api_version=2.0&app_id=${appId}`,
        json: true
      };

      return rp(options);
    })
    .then((artist) => {
      delete artist.mbid;
      delete artist.tracker_count;
      delete artist.upcoming_event_count;
      return res.send(artist);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        err.status = 404;
      }

      next(err);
    });
});

module.exports = router;

// Request body must be a single property called artist w an artist name
