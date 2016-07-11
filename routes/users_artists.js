'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/joiartists_users');

//
// post
//
// handling the submit of the add searched artist to favorite list
//
// receive artist name from the submit and add it to the body.
//
// Take the name from the body and put it in the artists_users as a new artist id saved in there all savey like.
//
// respond with appropriate error or completion messages.
//
// have the artists list on the side refresh and show the new artist as added.
router.get('/users/artists', (req, res, next) => {
  // get all artist that a user has in their favorites
  // database results in an array of artists
  // 
});


router.post('/users/artists/:artist_id', ev(validations.post), (req, res, next) => {
  const user_id = req.session.user_id;
  const artist_id = req.params.artist_id;

  knex('artists_users')
    .select(knex.raw('1=1'))
    .where('artist_id', artist_id)
    .first()
    .then((exists) => {
      if (exists) {
        const err = new Error('Artist already exists');
        err.status = 400; //bad request

        throw err;
      }

      return knex('artists_users')
        .insert({
          artist_id: artist_id,
          user_id: user_id
        }, '*')
        .then((results) => {
          // Push the new favorite artist into the array
          return res.status(200);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;




// get artists/users
//
// no body
//
// only triggered on users's login or page refresh.
//
// on login populate list of favorite artists.
//
// respond with the list as well as status code.
//
// list will include mbid's even though they won't be displayed.
