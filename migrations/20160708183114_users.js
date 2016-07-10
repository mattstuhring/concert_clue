'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('city').notNullable();
    table.specificType('state', 'char(2)').notNullable();
    table.string('user_name').notNullable();
    table.string('email');
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.integer('radius').notNullable().defaultTo(150);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
