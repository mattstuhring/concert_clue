<<<<<<< HEAD
=======
'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
>>>>>>> 161d16b81f833393741b60507748e96b787c57b9
