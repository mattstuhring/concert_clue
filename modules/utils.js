'use strict';

// eslint-disable-next-line max-params
const genEventsQuery = function(url, artists, appId, city, state, radius) {
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
};

module.exports = {
  genEventsQuery
};
