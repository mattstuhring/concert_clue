'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('artists', (table) => {
    table.increments();
    table.specificType('mbid', 'char(36)').defaultTo(null);
    table.string('name').defaultTo('');
    table.string('image_url').defaultTo('');
    table.string('thumb_url').defaultTo('');
    table.string('facebook_page_url').defaultTo('');
    table.string('facebook_tour_dates_url').defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('artists');
};
