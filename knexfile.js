'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/concert_clue_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/concert_clue_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
