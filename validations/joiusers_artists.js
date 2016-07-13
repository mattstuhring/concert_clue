'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    mbid: Joi.string()
      .label('Mbid')
      .required()
      .length(36)
      .trim()
  }
};
