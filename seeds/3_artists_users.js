'use strict';

exports.seed = function(knex) {
  return knex('artists_users').del()
    .then(() => {
      return knex('artists_users').insert([
        {
          id: 1,
          artist_id: 1,
          user_id: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 2,
          artist_id: 2,
          user_id: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 3,
          artist_id: 1,
          user_id: 2,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 4,
          artist_id: 2,
          user_id: 2,
          created_at: new Date('2016-06-27 14:26:16 UTC'),
          updated_at: new Date('2016-06-27 14:26:16 UTC')
        },
        {
          id: 5,
          artist_id: 3,
          user_id: 2,
          created_at: new Date('2016-06-28 14:26:16 UTC'),
          updated_at: new Date('2016-06-28 14:26:16 UTC')
        },
        {
          id: 6,
          artist_id: 4,
          user_id: 4,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('artists_users_id_seq', (SELECT MAX(id) FROM artists_users));"
      );
    });
};
