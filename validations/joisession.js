'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .label('Username')
      .required()
      .min(6)
      .max(30)
      .trim(),

    password: Joi.string()
      .label('Password')
      .required()
      .min(8)
      .max(255)
      .trim()
  }
};
