'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const request = require('request-promise');
const validations = require('../validations/joiartist');

router.get('/artists', ev(validations.get), (req, res, next) => {
  const { artist } = req.body;

  knex('artists')
    .select()
    .where('name', artist)
    .then((artists) => {
      if (artists.length > 0) {
        console.log(artist[0]);
        return res.send(artists[0]);
      }

      var options = {
        uri: '',

        json: true // Automatically parses the JSON string in the response
      };

      return rp(options);  
    })
    .then((artist)) {
      console.log(artist);
    }
    .catch((err) => {
      next(err);
    });

});

module.exports = router;

// Request body must be a single property called artist w an artist name
