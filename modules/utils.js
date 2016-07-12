'use strict';

// const eventsURL = 'http://api.bandsintown.com/events/search?api_version=2.0';
// const artists = ['Boston', 'Die Antwoord', 'AC/DC'];
// const appId = 'CHADTEST';
// const city = 'Seattle';
// const state = 'WA';
// const radius = 150;

const genEventsQuery = function (url, artists, appId, city, state, radius) {
  let query = '';
  let escArtists = '';

  for (const artist of artists) {
    escArtists += `&artists[]=${encodeURIComponent(artist)}`;
  }
  query += `${url}${escArtists}&app_id=${appId}&format=json`;
  if (city && state && radius) {
    query += `&location=${city},${state}&radius=${radius}`;
  }

  return query;
}

module.exports = {
  genEventsQuery
};
