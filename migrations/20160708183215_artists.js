'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('artists', (table) => {
    table.increments();
    table.specificType('mbid', 'char(36)').notNullable();
    table.string('name').notNullable();
    table.string('image_url');
    table.string('thumb_url');
    table.string('facebook_page_url');
    table.string('facebook_tour_dates_url');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('artists');
};
