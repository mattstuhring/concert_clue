'use strict';

// IFFE to protect global scope - Must be at top of file.
(function() {
  let events = [];
  let state = 0;

  const buildCookie = function() {
    window.COOKIES = {};
    document.cookie.split('; ').forEach((prop) => {
      const propKey = prop.split('=')[0];
      const propValue = prop.split('=')[1];

      window.COOKIES[propKey] = propValue;
    });

    if (window.COOKIES.loggedIn) {
      window.location.href = '/main.html';

      return;
    }
  };

  const validateUserName = function(username) {
    if (username.length < 6 || username.length > 255) {
      Materialize.toast('User name must be at least 6', 3000, 'rounded');

      return false;
    }

    return true;
  };

  const validatePassword = function(password) {
    if (password.length < 8 || password.length > 255) {
      Materialize.toast('Password length must be 8 or more', 3000, 'rounded');

      return false;
    }

    return true;
  };

  const validateSignup = function() {
    const username = ($('#username').val() || '').trim();
    const password = ($('#password').val() || '').trim();
    const city = ($('#city').val() || '').trim();
    const state = ($('#state').val() || '').trim();
    const radius = ($('#radius').val() || '').trim();

    if (!validateUserName(username)) {
      return false;
    }

    if (!validatePassword(password)) {
      return false;
    }

    if (city === '' || city.length > 255) {
      Materialize.toast('City name required', 3000, 'rounded');

      return false;
    }

    if (state === '') {
      Materialize.toast('State required', 3000, 'rounded');

      return false;
    }

    if (radius === '') {
      Materialize.toast('Radius required', 3000, 'rounded');

      return false;
    }

    return true;
  };

  const registerUser = function() {
    if (validateSignup()) {
      const username = ($('#username').val() || '').trim();
      const password = ($('#password').val() || '').trim();
      const city = ($('#city').val() || '').trim();
      const state = $('#state').val();
      const radius = Number.parseInt($('#radius').val());

      const newUser = {
        user_name: username,
        password,
        city,
        state,
        radius
      };

      let failed;
      const $xhr = $.ajax({
        method: 'POST',
        url: '/users/',
        contentType: 'application/json',
        data: JSON.stringify(newUser)
      });

      $xhr.done((data) => {
        const loggedInUser = { username, password };

        $.ajax({
          method: 'POST',
          url: '/session/',
          contentType: 'application/json',
          data: JSON.stringify(loggedInUser)
        })
        .done((data) => {
          window.location.href = '/main.html';
        })
        .fail(() => {
          Materialize.toast('User could not be logged in.');
          failed = true;
        });
      })
      .fail((err) => {
        if (err.status === 401 &&
          err.responseText === "Username already exists") {
          Materialize.toast('User name already exists', 3000, 'rounded');
          failed = true;
        }
      });

      if (!failed) {
        $('#register-user').closeModal();
      }
      else {
        $('#register-user').openModal();
      }
    }
    else {
      $('#register-user').openModal();
    }
  };

  const loginUser = function() {
    const username = ($('#username-login').val() || '').trim();
    const password = ($('#password-login').val() || '').trim();

    if (!(validateUserName(username) && validatePassword(password))) {
      return $('#login-user').openModal();
    }

    $.ajax({
      method: 'POST',
      url: '/session/',
      contentType: 'application/json',
      data: JSON.stringify({ username, password })
    })
    .done(() => {
      $('#register-user').closeModal();
      window.location.href = '/main.html';
    })
    .fail(() => {
      Materialize.toast('User name or password not correct', 3000, 'rounded');
    });
  };
  const buildEvents = function() {
    const $eventContainer = $('#event-container');

    $eventContainer.children().remove();
    $eventContainer.append('<div class="row"></div>');
    const $row = $eventContainer.children().first();

    for (const event of events) {
      $row.append(`
        <div class="col s12 barley valign-wrapper z-depth-3">
          <div class="hops valign">
            <p></p>
            <span>${event.artists[0].name}</span>
            <p>${event.venue.name}</p>
            <p>${moment(event.datetime).format(`dddd MMMM D, YYYY h:mma`)}</p>
            <p>${event.venue.city}, ${event.venue.region}</p>
            <div></div>
          </div>
        </div>
      `);
    }
  };

  const validateSearch = function(artist, city, state) {
    if (!artist || artist === '') {
      Materialize.toast('Must provide an artist', 3000, 'rounded');

      return false;
    }

    if (!city || city === '') {
      Materialize.toast('Must provide a city', 3000, 'rounded');

      return false;
    }

    if (state.length !== 2) {
      Materialize.toast('Use two letter state code', 3000, 'rounded');

      return false;
    }

    return true;
  };

  const searchArtist = function(event) {
    const artist = ($('#artist-search').val() || '').trim().toLowerCase();
    const city = ($('#city-search').val() || '').trim();
    const state = ($('#state-search').val() || '').trim();
    const radius = 150;

    if (!validateSearch(artist, city, state)) {
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/artists/events',
      contentType: 'application/json',
      data: JSON.stringify({
        artists: [artist],
        city,
        state,
        radius
      })
    })
    .done((data) => {
      events = data;
      buildEvents();
      if (events.length === 0) {
        return Materialize.toast('No shows for this artist', 3000, 'rounded');
      }
      window.scrollTo(0, 659);
      const $eventContainer = $('#event-container');
      const bodyRect = document.body.getBoundingClientRect();
      const element = $eventContainer.children().last()[0];
      const elemRect = element.getBoundingClientRect();
      const offset = elemRect.bottom - bodyRect.top;

      $(window).scroll(function() {
        $('#top').toggle($(document).scrollTop() > offset - 600);
      });

    })
    .fail((err) => {
      if (err.status === 404) {
        const text = err.responseText.substr(6, err.responseText.length);
        const parsedErrors = JSON.parse(text);

        Materialize.toast(parsedErrors.errors.join(', '), 3000, 'rounded');
      }
    });
  };

  const validateNotEmpty = function(event) {
    const $target = $(event.target);
    const value = ($target.val() || '').trim();

    if (value === '') {
      $target.addClass('invalid');
      $target.removeClass('valid');
    }
    else {
      $target.addClass('valid');
      $target.removeClass('invalid');
    }
  };

  const validateStateNotEmpty = function(event) {
    const $target = $(event.target);
    const $select = $('.select-wrapper input.select-dropdown');

    if ($target.val().trim() === '') {
      $('.select-wrapper+label').removeClass('valid');
      $select.addClass('invalid');
      $select.removeClass('valid');
    }
    else {
      $('.select-wrapper+label').addClass('valid');
      $select.addClass('valid');
      $select.removeClass('invalid');
    }
  };

  const checkSubmit = function(event) {
    if (event.keyCode !== 13) {
      return;
    }

    if (state === 0) {
      searchArtist();
    }

    if (state === 1) {
      loginUser();
    }

    if (state === 2) {
      registerUser();
    }
  };

  const openLogin = function() {
    state = 1;
  };

  const closeLogin = function() {
    state = 0;
  };

  const openSignup = function() {
    state = 2;
  };

  const closeSignup = function() {
    state = 0;
  };

  const checkLoginUserName = function(event) {
    const $target = $(event.target);
    const username = ($target.val() || '').trim();

    if (username.length < 6) {
      $target.addClass('invalid');
      $target.removeClass('valid');
    }
    else {
      $target.addClass('valid');
      $target.removeClass('invalid');
    }
  };

  const checkLoginPassword = function(event) {
    const $target = $(event.target);
    const password = ($target.val() || '').trim();

    if (password.length < 8) {
      $target.addClass('invalid');
      $target.removeClass('valid');
    }
    else {
      $target.addClass('valid');
      $target.removeClass('invalid');
    }
  };

// ****************** Establish event listeners / Immediate execution
  buildCookie();
  $('select').material_select();
  $('.button-collapse').sideNav();
  $('.parallax').parallax();
  $('.modal-trigger.signup').leanModal({
    dismissible: true,
    opacity: 0.5,
    in_duration: 300,
    out_duration: 200,
    ready: openSignup,
    complete: closeSignup
  });
  $('.modal-trigger.login').leanModal({
    dismissible: true,
    opacity: 0.5,
    in_duration: 300,
    out_duration: 200,
    ready: openLogin,
    complete: closeLogin
  });
  $('select').material_select();
  $(window).scroll(function() {
    $('#top').toggle($(document).scrollTop() > 300);
  });
  $('#register-user .modal-action').on('click', registerUser);
  $('#login-user .modal-action').on('click', loginUser);
  $('#submit-search').on('click', searchArtist);
  $('#city-search, #artist-search').on('keyup', validateNotEmpty);
  $('body').on('keyup', checkSubmit);
  $('#state-search').on('change', validateStateNotEmpty);
  $('.select-wrapper input.select-dropdown').addClass('invalid');
  $('#username-login').on('keyup', checkLoginUserName);
  $('#password-login').on('keyup', checkLoginPassword);

// End IFFE - Must be at bottom of file.
})();
