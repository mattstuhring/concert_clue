'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/joisession');

router.post('/session', ev(validations.post), (req, res, next) => {
  const { username, password } = req.body;
  let user;

  knex('users')
    .where('user_name', username)
    .first()
    .then((userRow) => {
      if (!userRow) {
        const err = new Error();

        err.status = 401;
        throw err;
      }

      user = userRow;
      const hashed_password = user.hashed_password;

      return bcrypt.compare(password, hashed_password);
    })
    .then(() => {
      req.session.userId = user.id;
      res.cookie('loggedIn', true);
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      const err = new Error('Unauthorized');

      err.status = 401;

      throw err;
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/session', (req, res) => {
  req.session = null;
  res.clearCookie('loggedIn');
  res.sendStatus(200);
});

module.exports = router;
