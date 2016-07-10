'use strict';

exports.seed = function(knex) {
  return knex('artists').del()
    .then(() => {
      return knex('artists').insert([
        {
          id: 1,
          mbid: '0d8b0d50-e4cf-4da4-965d-f24c58ec3268',
          name: 'Boston',
          image_url: 'https://s3.amazonaws.com/bit-photos/large/6681217.jpeg',
          thumb_url: 'https://s3.amazonaws.com/bit-photos/thumb/6681217.jpeg',
          facebook_page_url: 'http://www.facebook.com/pages/Boston/259521330754606',
          facebook_tour_dates_url: 'http://www.bandsintown.com/Boston/facebookapp?came_from=67',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 2,
          mbid: 'b7ffd2af-418f-4be2-bdd1-22f8b48613da',
          name: 'Nine Inch Nails',
          image_url: 'https://s3.amazonaws.com/bit-photos/large/6342550.jpeg',
          thumb_url: 'https://s3.amazonaws.com/bit-photos/thumb/6342550.jpeg',
          facebook_page_url: 'http://www.facebook.com/pages/NIN/135242536551565',
          facebook_tour_dates_url: 'http://www.bandsintown.com/NineInchNails/facebookapp?came_from=67',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 3,
          mbid: '1de93a63-3a9f-443a-ba8a-a43b5fe0121e',
          name: 'Adele',
          image_url: 'https://s3.amazonaws.com/bit-photos/large/6115532.jpeg',
          thumb_url: 'https://s3.amazonaws.com/bit-photos/thumb/6115532.jpeg',
          facebook_page_url: null,
          facebook_tour_dates_url: null,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 4,
          mbid: 'ac865b2e-bba8-4f5a-8756-dd40d5e39f46',
          name: 'Korn',
          image_url: 'https://s3.amazonaws.com/bit-photos/large/6522532.jpeg',
          thumb_url: 'https://s3.amazonaws.com/bit-photos/thumb/6522532.jpeg',
          facebook_page_url: 'http://www.facebook.com/korn',
          facebook_tour_dates_url: 'http://www.bandsintown.com/Korn/facebookapp?came_from=67',
          created_at: new Date('2016-07-10 13:26:16 UTC'),
          updated_at: new Date('2016-07-10 13:26:16 UTC')
        }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('artists_id_seq', (SELECT MAX(id) FROM artists));"
      );
    });
};
