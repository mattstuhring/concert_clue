'use strict';
(function () {

  $(".button-collapse").sideNav();


  // let firstSearch = function{$('.artistFixture').append(`<div class="section">
  // <h5>Artist</h5>
  // </div>
  // <div class="row searchResponseCard">
  // </div>`)};



  let searchCount = 0;

  $('.searchSubmit').submit((event) => {

    let $xhr = $.ajax({
      method: 'GET',  // GET is default
      url: '/artists',
      dataType: 'json',
      data: {
        artist.name: $('#search').val().trim(),
        city: session.user.city,
        state: session.user.state,
        radius: session.user.radius
      }
    });


    $xhr.done(function(artist) {
      if ($xhr.status !== 200) {

        return Materialize.toast('Could not locate Artist, try again');
      }
      const artistName = artist.name;
      const artistThumb = artist.thumb_url;
      const artistDescription = artist.weneedtodecidethis;
      const addToFavorites = chadRouteTBD;
      const upcomingShows = doApiCallMagic || artist.facebook_tour_dates_url;
      const city = artist.city;
      const state = artist.state;
      const radius = artist.radius;

      if (searchCount !== 1) {
        $('.searchResponseCard').children().remove()
      }

      if (searchCount === 0) {
        // firstSearch();
        () => {$('.artistFixture').append(`<div class="section">
        <h5>Artist</h5>
        </div>
        <div class="row searchResponseCard">
        </div>`)};
      }

      searchCount += 1;

      () => {$('.searchResponseCard').append(`
        <div class="col s12 l10">
        <div class="card">
        <div class="row">
        <div class="col m5 s12 l4">
        <div class="card-image">
        <img src=${artistThumb()}>
        <span class="card-title">${artistName()}</span>
        </div>
        </div>
        <div class="col s12 m7 l8">
        <div class="card-content">
        <p>${artistDescription()}</p>
        </div>
        <div class="card-action">
        <a href="#">${addToFavorites()}</a>
        <a class ="eventAdd">Upcoming Shows!</a>
        </div>
        </div>
        </div>
        </div>
        </div>`
      )};
    });

    $xhr.fail(function(err) {
      // The request was unsuccessful for some reason (ie. the server couldn't even respond).
      console.log(err);
    });
  })

    // add event handler
  $('.eventAdd').click((event) => {

    let $xhr = $.ajax({
      method: 'GET',
      url: '/artists',
      dataType: 'json',
      data: {
        artist: $('').val().trim(),
        city: ,
        state: ,
        radius:
      }
    });

    $xhr.done(function(events) {
      if ($xhr.status !== 200) {

        return Materialize.toast('');
      }

      // on return cycle through the array of events. for each event in the array of events return an eventCard.
      const eventTitle = function() {

      };

      const eventDescription = function() {

      };

      const formatted_datetime = function() {

      };

      const facebook_tour_dates_url = function() {

      };

      let eventAddCard = function {$('.eventAddCard').append(`
        <div class="col s12 m10">
        <div class="card blue-grey darken-1">
        <div class="card-content white-text">
        <span class="card-title">${eventTitle()}</span>
        <p>${eventDescription()}</p>
        </div>
        <div class="card-action">
        <a href="#">${formatted_datetime()}</a>
        <a href="#">${facebook_tour_dates_url()}</a>
        </div>
        </div>
        </div>
        `)}
    });

    $xhr.fail(function(err) {
      // The request was unsuccessful for some reason (ie. the server couldn't even respond).
      console.log(err);
    });

  })






// End IFFE - Must be at bottom of file.



})();
