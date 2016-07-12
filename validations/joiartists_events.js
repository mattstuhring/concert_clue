'use strict';

const Joi = require('joi');

module.exports.get = {
  body: {
    artists: Joi.array()
      .label('Artists')
      .items(
        Joi.string()
        .label('Artist Name')
        .required()
        .max(255)
        .trim()
      ),
    city: Joi.string()
      .label('City')
      .max(255)
      .trim(),
    state: Joi.string()
      .label('State')
      .trim()
      .length(2),
    radius: Joi.number()
      .label('Radius')
      .integer()
      .min(1)
      .max(150)
  }
};
