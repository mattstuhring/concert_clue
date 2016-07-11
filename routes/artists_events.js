'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/joiartists_events');

router.get('/artists/events', ev(validations.get), (req, res, next) => {

  knex('artists')
    .select(knex.raw('1=1'))
    .where('name', req.body.name)
    .first()
    .then((exists) => {
      // if exists pull data from db for client
      // if does not call api for data
      if (exists) {
        return knex('artists')
          .where('name', req.body.name)
          .first()
          .then((results) => {
            res.send(results[0]);
          })
          .catch((err) => {
            next(err);
          });
      }

      var $xhr = $.ajax({
        method: 'GET',
        url: ``,
        dataType: 'json'
      });
      ​
      $xhr.done(function(data) {
          if ($xhr.status !== 200) {
              // The served an unsuccessful status code.
              return;
          }
      ​
          console.log(data);
      });
      ​
      $xhr.fail(function(err) {
          // The request was unsuccessful for some reason (ie. the server couldn't even respond).
          console.log(err);
      });
    })
    .catch((err) => {
      next(err);
    });

});


module.exports = router;

/* handling get request to ./artists/events

A properly formed get request to /artist/events must be an array of artists names in the body.

The body will simply JSON.parse()  it will be a jsonrequest as the body.  we'll do some stringifcation and

if we don't receive a properly formed body in the request, we'll respond with a 401 error.

*/
