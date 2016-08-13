'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    user_name: Joi.string()
      .label('User_name')
      .required()
      .min(6)
      .max(255)
      .trim(),

    password: Joi.string()
      .label('Password')
      .required()
      .min(8)
      .max(255)
      .trim(),

    first_name: Joi.string()
      .label('First Name')
      .min(2)
      .max(255)
      .trim(),

    last_name: Joi.string()
      .label('Last Name')
      .min(2)
      .max(255)
      .trim(),

    city: Joi.string()
      .label('City')
      .required()
      .min(1)
      .max(255)
      .trim(),

    state: Joi.string()
      .label('State')
      .required()
      .min(2)
      .max(2)
      .trim(),

    radius: Joi.number()
      .label('Radius Search')
      .required()
      .integer()
      .positive()
      .min(25)
      .max(150)
  }
};

// Req.body must contain user_name, password, city, state, and radius.
module.exports.patch = {
  body: {
    user_name: Joi.string()
      .label('User_name')
      .required()
      .min(6)
      .max(255)
      .trim(),

    password: Joi.string()
      .label('Password')
      .required()
      .min(8)
      .max(255)
      .trim(),

    first_name: Joi.string()
      .label('First Name')
      .min(2)
      .max(255)
      .trim(),

    last_name: Joi.string()
      .label('Last Name')
      .min(2)
      .max(255)
      .trim(),

    city: Joi.string()
      .label('City')
      .required()
      .min(1)
      .max(255)
      .trim(),

    state: Joi.string()
      .label('State')
      .required()
      .min(2)
      .max(2)
      .trim(),

    radius: Joi.number()
      .label('Radius Search')
      .required()
      .integer()
      .min(25)
      .max(150)
  }
};
