'use strict';

'use strict'

exports.seed = function(knex) {
  return knex('artists').del()
    .then(() => {
      return knex('artists').insert([{
        id: 1,
        first_name: 'Foo',
        last_name: 'Fighters',
        email: 'dave@grohl.com',
        hashed_password: '$2a$12$8vxYfAWCXewuqWNukOkgNX8n49G2tD71ipcgJ1a0Hm4otEZef80Vu',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        first_name: 'Alice',
        last_name: 'Cooper',
        email: 'alice@cooper.com',
        hashed_password: '$2a$12$8vxYfAWCOkgNX8n4otEZefXe9G2tD71ipcgJ1a0Hm4wuqWNuk80Vu',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },
      {
        id: 3,
        first_name: 'Thom',
        last_name: 'Yorke',
        email: 'thom@yorke.com',
        hashed_password: '$2a$12$8vxYfAWCXewX8J1a0Huqn49G2tD71ipcgWNukOkgNm4otEZef80Vu',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('artists_id_seq', (SELECT MAX(id) FROM books));"
      );
    });
};
