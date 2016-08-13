'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const ev = require('express-validation');
const validations = require('../validations/joiusers');

const checkAuth = function(req, res, next) {
  if (!Number.parseInt(req.session.userId)) {
    const err = new Error();

    err.status = 401;

    return next(err);
  }

  next();
};

// Req.body must contain user_name, password, city, state, and radius.
router.post('/users', ev(validations.post), (req, res, next) => {
  const newUser = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('user_name', newUser.user_name)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(401, 'Username already exists');
      }

      return bcrypt.hash(newUser.password, 12);
    })

    /*eslint-disable */
    .then((hashedPassword) => knex('users').insert({
        user_name: newUser.user_name,
        hashed_password: hashedPassword,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        city: newUser.city,
        state: newUser.state,
        radius: newUser.radius
      }, '*'))

    /*eslint-enable */
    .then(() => res.sendStatus(200))
    .catch((err) => {
      next(err);
    });
});

// Route returns current user preferences to a logged in user.
router.get('/users', checkAuth, (req, res, next) => {
  const userId = Number.parseInt(req.session.userId);

  knex('users')
    .select('first_name', 'last_name', 'city', 'state', 'user_name', 'radius',
     'email')
    .where('id', userId)
    .first()
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
});

// Req.body must contain user_name, password, city, state, and radius.
// Route needs to be tested!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.patch('/users', checkAuth, ev(validations.patch), (req, res, next) => {
  const userId = Number.parseInt(req.session.userId);
  const userName = req.body.user_name;
  const { password, city, state, radius } = req.body;

  knex('users')
    .where('user_name', user_name)
    .first()
    .then((user) => {
      if (user) {
        throw boom.unauthorized('Username already exists');
      }

      return knex('users')
        .where(id, userId)
        .update({
          user_name: userName,
          password,
          city,
          state,
          radius
        });
    })
    .then((count) => {
      if (count === 0) {
        throw boom.notFound('UserId not found')
      }

      return knex('users')
        .where(id, userId)
        .first();
    })
    .then((updatedUser) => {
      delete updatedUser.hashed_password;
      res.send(updatedUser);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
