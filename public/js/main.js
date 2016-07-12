'use strict';
(function () {

  $(".button-collapse").sideNav();

  let searchAddCard = function {$('.searchResponseCard').append(`
    <div class="col s9">
    <div class="card">
    <div class="row">
    <div class="col s4">
    <div class="card-image">
    <img src=${artistThumb()}>
    <span class="card-title">${artistName()}</span>
    </div>
    </div>
    <div class="col s8">
    <div class="card-content">
    <p>${artistDescription()}</p>
    </div>
    <div class="card-action">
    <a href="#">${addToFavorites()}</a>
    <a href="#">${upcomingShows()}</a>
    </div>
    </div>
    </div>
    </div>
    </div>`
  )};

$('.searchSubmit').submit((event) => {


let $xhr = $.ajax({
  method: 'GET',  // GET is default
  url: '/artists',
  dataType: 'json',
  data: {
    artist: $('#search').val().trim(),
    city: ,
    state: ,
    radius:
  }
});

$xhr.done(function(potato) {
  if ($xhr.status !== 200) {

    return Materialize.toast('Could not locate Artist, try again');
  }
  const artistThumb = potato.thumb_url;
  const artistName = potato.name
  const artistDescription = potato.weneedtodecidethis
  const addToFavorites = null;
  const upcomingShows = facebook_tour_dates_url;


  return searchAddCard(potato);


    console.log(potato);
});

$xhr.fail(function(err) {
    // The request was unsuccessful for some reason (ie. the server couldn't even respond).
    console.log(err);
});

})







const eventTitle = function() {

};

const eventDescription = function() {

};

const formatted_datetime = function() {

};

const facebook_tour_dates_url = function() {

};


let eventAddCard = function {$('.eventAddCard').append(`
  <div class="col s10">
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


// End IFFE - Must be at bottom of file.



})();
