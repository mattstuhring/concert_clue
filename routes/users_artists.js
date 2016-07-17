'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const val = require('../validations/joiusers_artists');
const rp = require('request-promise');

const appId = 'CHADTEST';
const prefix = 'http://api.bandsintown.com/artists/mbid_';
const suffix = '?api_version=2.0&format=json&app_id=';

const checkAuth = function(req, res, next) {
  if (!Number.parseInt(req.session.userId)) {
    const err = new Error();

    err.status = 401;

    return next(err);
  }

  next();
};

// Get all artists that a user has in their favorites - responds with an
// array of artist objects or an empty array
// Only triggered on users's login or page refresh?
router.get('/users/artists', checkAuth, (req, res, next) => {
  const userId = Number.parseInt(req.session.userId);

  knex('artists_users')
    .select('artists_users.id as id', 'mbid', 'name', 'image_url',
    'thumb_url', 'facebook_page_url', 'facebook_tour_dates_url')
    .where('user_id', userId)
    .innerJoin('artists', 'artists_users.artist_id', 'artists.id')
    .then((favorites) => {
      return res.send(favorites);
    })
    .catch((err) => {
      next(err);
    });
});

// Handling the submit of the add searched artist to favorite list
// Req.body should contain 1 property called mbid which is a string - the
// music brainz id of the artist.
// if the artist is in the local db and updated within the last 24 hours then
// route returns the local db copy. Otherwise it queries bandsintown and inserts
// or updates the record in the local db then adds to the
// artists_users table then returns the artist.
router.post('/users/artists/', checkAuth, ev(val.post), (req, res, next) => {
  const userId = req.session.userId;
  const { mbid } = req.body;
  let updateArtistId;
  let artistResult;

  knex('artists')
    .select()
    .where('mbid', mbid)
    .first()
    .then((artist) => {
      if (artist) {
        const artistDate = new Date(artist.updated_at);
        const date = new Date();

        // if the artistDate is less than 1 day old then send the artist
        if (date - artistDate < 1000 * 60 * 60 * 24) {
          const err = new Error();

          err.artist = artist;
          throw err;
        }

        // mark flag to update artist in local db.
        updateArtistId = artist.id;
      }

      const options = {
        uri: `${prefix}${mbid}${suffix}${appId}`,
        json: true
      };

      return rp(options);
    })
    .then((artist) => {
      if (updateArtistId) {
        return knex('artists')
          .update({
            mbid: artist.mbid,
            name: artist.name,
            image_url: artist.image_url,
            thumb_url: artist.thumb_url,
            facebook_page_url: artist.facebook_page_url,
            facebook_tour_dates_url: artist.facebook_tour_dates_url,
            updated_at: new Date()
          }, "*")
          .where('id', updateArtistId);
      }

      return knex('artists')
        .insert({
          mbid: artist.mbid,
          name: artist.name,
          image_url: artist.image_url,
          thumb_url: artist.thumb_url,
          facebook_page_url: artist.facebook_page_url,
          facebook_tour_dates_url: artist.facebook_tour_dates_url
        }, "*");
    })
    .then((artists) => {
      return artists[0];
    })
    .catch((err) => {
      if (err.artist) {
        return err.artist;
      }

      throw err;
    })
    .then((artist) => {
      artistResult = artist;

      return knex('artists_users')
        .select()
        .where('user_id', userId)
        .andWhere('artist_id', artist.id);
    })
    .then((favorites) => {
      if (favorites.length > 0) {
        const err = new Error();

        err.status = 406;

        throw err;
      }

      return knex('artists_users')
        .insert({
          user_id: userId,
          artist_id: artistResult.id
        }, "*");
    })
    .then((artistUsers) => {
      delete artistResult.created_at;
      delete artistResult.updated_at;
      artistResult.id = artistUsers[0].id;

      return res.send(artistResult);
    })
    .catch((err) => {
      next(err);
    });
});

// Body must contain the ccauid (id from artists_users) which is stored in
// Attribute of remove anchor tag on favorites list. ccauid is body property.
router.delete('/users/artists', checkAuth, ev(val.delete), (req, res, next) => {
  const id = req.body.ccauid;
  let artist;

  knex('artists_users')
    .select('mbid', 'name', 'image_url', 'thumb_url', 'facebook_page_url',
    'facebook_tour_dates_url')
    .where('artists_users.id', id)
    .join('artists', 'artists_users.artist_id', 'artists.id')
    .then((deletedArtists) => {
      if (deletedArtists.length === 0) {
        const err = new Error();

        err.status = 404;

        throw err;
      }

      artist = deletedArtists[0];

      return knex('artists_users')
        .del()
        .where('id', id);
    })
    .then((count) => {
      return res.send(artist);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
