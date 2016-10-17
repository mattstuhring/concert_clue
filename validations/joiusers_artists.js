'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    mbid: Joi.string()
      .label('Mbid')
      .length(36)
      .trim()
  }
};

module.exports.delete = {
  body: {
    ccauid: Joi.number()
      .label('ccauid')
      .integer()
      .min(1)
      .required()
  }
};
