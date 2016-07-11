'use strict';

const Joi = require('joi');

module.exports.get = {
  body: {
    artist: Joi.string()
      .label('Artist')
      .required()
      .trim()
  }
};
