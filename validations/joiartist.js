'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    artist: Joi.string()
      .label('Artist')
      .required()
      .trim()
  }
};
