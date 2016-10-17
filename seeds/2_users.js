'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        id: 1,
        first_name: 'Matt',
        last_name: 'Stuhring',
        city: 'Brier',
        state: 'WA',
        user_name: 'mattstuhring',
        email: 'matt@test.com',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$T9onmg8dSNVndtac6xVZgOgYNKpT/F1n1EyY7GSm9nRIYtB/YFiTO',
        radius: 150,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },
      {
        id: 2,
        first_name: 'Chad',
        last_name: 'Latham',
        city: 'Tacoma',
        state: 'WA',
        user_name: 'chadlatham',
        email: null,

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$e1rLWAJmEOhD/6uBZ.IME.NOH3ezqu86YIClih.6UewqBRUNP/QyS',
        radius: 150,
        created_at: new Date('2016-06-27 15:30:16 UTC'),
        updated_at: new Date('2016-06-27 15:30:16 UTC')
      },
      {
        id: 3,
        first_name: 'Patrick',
        last_name: 'Richardson',
        city: 'Bellevue',
        state: 'WA',
        user_name: 'setfloat',
        email: 'hello@setfloat.com',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$e1rLWAJmEOhD/6uBZ.IME.NOH3ezqu86YIClih.6UewqBRUNP/QyS',
        radius: 150,
        created_at: new Date('2016-06-28 13:26:16 UTC'),
        updated_at: new Date('2016-06-28 13:26:16 UTC')
      },
      {
        id: 4,
        first_name: 'Stanley',
        last_name: 'Dog',
        city: 'Seattle',
        state: 'WA',
        user_name: 'stantheman',
        email: 'stanley@dog.com',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$e1rLWAJmEOhD/6uBZ.IME.NOH3ezqu86YIClih.6UewqBRUNP/QyS',
        radius: 150,
        created_at: new Date('2016-06-29 12:16:16 UTC'),
        updated_at: new Date('2016-06-29 12:16:16 UTC')
      }])
    )
    .then(() => knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    );
};
