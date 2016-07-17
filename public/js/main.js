'use strict';

// eslint-disable-next-line max-statements
(function() {
  let favorites = [];
  let events = [];
  let searchText = '';

  window.COOKIES = {};
  document.cookie.split('; ').forEach((prop) => {
    const propKey = prop.split('=')[0];
    const propValue = prop.split('=')[1];

    window.COOKIES[propKey] = propValue;
  });

  const buildFavorites = function() {
    // eslint-disable-next-line no-undef
    favorites = _.sortBy(favorites, (fav) => fav.name);
    const $favart = $('.favart');

    $favart.children().remove();
    $favart.append(`<li class="collection-header">
    <h4>Favorite Artist</h4></li>`);

    for (const artist of favorites) {
      $favart.append(
        `<li class="collection-item avatar">
          <a href="${artist.facebook_page_url}"><img
          src="${artist.thumb_url}" alt="artist pic" class="circle"></a>
          <span class="title">${artist.name}</span>
          <a class="secondary-content ccauid"
          ccauid="${artist.id}"><i class="material-icons">cancel</i></a>
        </li>`
      );
    }
  };

  const buildEvents = function() {
    const $eventAddCard = $('.eventAddCard');

    $eventAddCard.children().remove();

  /* eslint-disable */
    for (const event of events) {
      $eventAddCard.append(`<div class="col s12 barley valign-wrapper
      z-depth-3">
        <div class="hops valign">
          <p></p>
          <span>${event.artists[0].name}</span>
          <p>${event.venue.name}</p>
          <p>${moment(event.datetime).format(`dddd MMMM D, YYYY h:mma`)}</p>
          <p>${event.venue.city}, ${event.venue.region}</p>
          <div></div>
        </div>
      </div>`);
    }

  /* eslint-enable */
  };

  const logout = function() {
    const $xhr = $.ajax({
      method: 'DELETE',
      url: '/session/',
      contentType: 'application/json'
    });

    $xhr.done(() => {
      window.location.href = '/';
    });

    $xhr.fail(() => {
      Materialize.toast('Logout failure', 3000, 'rounded');
    });
  };

  const buildMainPage = function() {
    $.ajax({
      method: 'GET',
      url: '/users/artists',
      contentType: 'application/json'
    })
    .done((artists) => {
      favorites = artists;
      buildFavorites();
      const artistNames = favorites.map((art) => art.name);
      let city;
      let state;
      let radius;

      $.ajax({
        method: 'GET',
        url: '/users/',
        contentType: 'application/json'
      })
      .done((user) => {
        city = user.city;
        state = user.state;
        radius = user.radius;
        $.ajax({
          method: 'POST',
          url: '/artists/events/',
          contentType: 'application/json',
          data: JSON.stringify({
            artists: artistNames,
            city,
            state,
            radius
          })
        })
        .done((localEvents) => {
          // eslint-disable-next-line no-undef
          events = _.sortBy(localEvents, (object) => object.datetime);
          buildEvents();
        })
        .fail(() => {
          Materialize.toast('Server error', 3000, 'rounded');
        });
      })
      .fail(() => {
        Materialize.toast('Server error', 3000, 'rounded');
      });
    })
    .fail(() => {
      Materialize.toast('Server error', 3000, 'rounded');
    });
  };

  const remFavArt = function(event) {
    const $a = $(event.target).parent();
    const ccauid = Number.parseInt($a.attr('ccauid'));
    let index;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id === ccauid) {
        index = i;
        continue;
      }
    }

    const $xhr = $.ajax({
      method: 'DELETE',
      url: '/users/artists',
      contentType: 'application/json',
      data: JSON.stringify({ ccauid })
    });

    $xhr.done(() => {
      favorites.splice(index, 1);
      buildFavorites();
      const artistNames = favorites.map((art) => art.name);
      let city;
      let state;
      let radius;

      $.ajax({
        method: 'GET',
        url: '/users/',
        contentType: 'application/json'
      })
      .done((user) => {
        city = user.city;
        state = user.state;
        radius = user.radius;

        $.ajax({
          method: 'POST',
          url: '/artists/events/',
          contentType: 'application/json',
          data: JSON.stringify({
            artists: artistNames,
            city,
            state,
            radius
          })
        })
        .done((localEvents) => {
          // eslint-disable-next-line no-undef
          events = _.sortBy(localEvents, (object) => object.datetime);
          buildEvents();
        })
        .fail(Materialize.toast('We are here!!!!!!', 3000, 'rounded')
        );
      })
      .fail(Materialize.toast('We are fail', 3000, 'rounded')
      );
    });

    $xhr.fail((err) => {
      if (err.status === 404) {
        Materialize.toast('That artist is too good to delete.',
        3000, 'rounded');
      }
      else {
        Materialize.toast('Try again later', 3000, 'rounded');
      }
    });
  };

  const searchResponseCard = function(artist) {
    const $searchResponseCard = $('.searchResponseCard');

    $searchResponseCard.children().remove();

    $searchResponseCard.append(
      `<div class="col s12 l10">
        <div class="card">
          <div class="row">
                <div class="col m5 s12 l4">
                  <div class="card-image">
                    <img src="${artist.thumb_url}" alt"artistPicture">
                  </div>
                </div>
            <div class="col s12 m7 l8">
              <div class="card-content">
                <span class="card-title"><h4>${artist.name}</h4></span>
              </div>
              <div class="card-action">
                <div class="row">
                  <div class="col s8">
                    <h5><a mbid="${artist.mbid}" class="addFave"
                    href="#">Add to Favorites<h5><h5>
                  </div>
                <div class="col s4">
                  <a href="${artist.facebook_page_url}"><img
                  src="/images/fb30.png"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>`
  );
  };

  const search = function() {
    const $search = $('#search');
    const searchTextNow = $search.val().trim().toLowerCase();

    searchText = searchTextNow;
    if (searchText.length === 0) {
      Materialize.toast('What would you like to search for?', 3000, 'rounded');

      return;
    }

    const $xhrsearch = $.ajax({
      method: 'POST',
      url: '/artist',
      contentType: 'application/json',
      data: JSON.stringify({
        artist: searchText
      })
    });

    $xhrsearch.done((data) => {
      searchResponseCard(data);
      const $xhr = $.ajax({
        method: 'GET',
        url: '/users',
        contentType: 'application/json'
      });

      $xhr.done((userData) => {
        const { city, state, radius } = userData;

        const $xhrin = $.ajax({
          method: 'POST',
          url: '/artists/events',
          contentType: 'application/json',
          data: JSON.stringify({
            artists: [searchText],
            city,
            state,
            radius
          })
        });

        $xhrin.done((artistsEvents) => {
          if (artistsEvents.length === 0) {
            events = [];
            buildEvents();

            return Materialize.toast('No upcoming shows', 3000, 'rounded');
          }

          // eslint-disable-next-line no-undef
          events = _.sortBy(artistsEvents, (object) => object.datetime);
          buildEvents();
        });

        $xhrin.fail((err) => {
          if (err.status === 404) {
            return Materialize.toast('Artist not found', 3000, 'rounded');
          }

          Materialize.toast('Hmmm, try again later', 3000, 'rounded');
        });
      });

      $xhr.fail(() => {
        Materialize.toast('Try again?', 3000, 'rounded');
      });
    });

    $xhrsearch.fail((err) => {
      // alert(err.status);
      if (err.status === 404) {
        return Materialize.toast('Artist not found', 3000, 'rounded');
      }

      Materialize.toast('Hmmm, try again later', 3000, 'rounded');
    });
  };

  const addToFavorites = function(event) {
    $.ajax({
      method: 'POST',
      url: '/users/artists',
      contentType: 'application/json',
      data: JSON.stringify({
        mbid: $(event.target).attr('mbid')
      })
    })
    .done((artist) => {
      favorites.push(artist);
      buildFavorites();
      const $xhr = $.ajax({
        method: 'GET',
        url: '/users',
        contentType: 'application/json'
      });

      $xhr.done((data) => {
        const { city, state, radius } = data;
        const faveNames = favorites.map((arts) => arts.name);
        const $xhrp = $.ajax({
          method: 'POST',
          url: '/artists/events',
          contentType: 'application/json',
          data: JSON.stringify({
            artists: faveNames,
            city,
            state,
            radius
          })
        });

        $xhrp.done((artistsEvents) => {
          if (artistsEvents.length === 0) {
            events = [];
            buildEvents();

            return Materialize.toast('No upcoming shows', 3000, 'rounded');
          }

          // eslint-disable-next-line no-undef
          events = _.sortBy(artistsEvents, (object) => object.datetime);
          buildEvents();
        });

        $xhrp.fail((err) => {
          if (err.status === 404) {
            return Materialize.toast('Artist not found', 3000, 'rounded');
          }

          Materialize.toast('Hmmm, try again later', 3000, 'rounded');
        });
      });

      $xhr.fail(() => {
        Materialize.toast('Try again?', 3000, 'rounded');
      });
    })
    .fail((err) => {
      if (err.status === 406) {
        return Materialize.toast('Dang, you must like them!', 3000, 'rounded');
      }
      Materialize.toast('We have a problem, try again', 3000, 'rounded');
    });
  };

  const showFavorites = function() {
    const $xhr = $.ajax({
      method: 'GET',
      url: '/users',
      contentType: 'application/json'
    });

    $xhr.done((data) => {
      const { city, state, radius } = data;
      const faveNames = favorites.map((arts) => arts.name);
      const $xhrzin = $.ajax({
        method: 'POST',
        url: '/artists/events',
        contentType: 'application/json',
        data: JSON.stringify({
          artists: faveNames,
          city,
          state,
          radius
        })
      });

      $xhrzin.done((artistsEvents) => {
        if (artistsEvents.length === 0) {
          events = [];
          buildEvents();

          return Materialize.toast('No upcoming shows', 3000, 'rounded');
        }

        // eslint-disable-next-line no-undef
        events = _.sortBy(artistsEvents, (object) => object.datetime);
        buildEvents();
      });

      $xhrzin.fail((err) => {
        if (err.status === 404) {
          return Materialize.toast('Artist not found', 3000, 'rounded');
        }

        Materialize.toast('Hmmm, try again later', 3000, 'rounded');
      });
    });

    $xhr.fail(() => {
      Materialize.toast('Try again?', 3000, 'rounded');
    });
  };

  $('.favart').on('click', '.ccauid', remFavArt);

  $('#searchbutton').click(search);

  $('.logout').on('click', logout);

  $('.favart').on('click', '.collection-header', showFavorites);

  $('.searchResponseCard').on('click', '.addFave', addToFavorites);
  buildMainPage();

// End IFFE - Must be at bottom of file.
})();
