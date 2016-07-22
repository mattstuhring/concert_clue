'use strict';

// IFFE to protect global scope - Must be at top of file.
// eslint-disable-next-line max-statements
(function() {
  // eslint-disable-next-line strict
  'use strict';

  let events = [];
  let windowState = 0;

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

  const toast = function(message, time, type) {
    Materialize.toast(message, time, type);

    return false;
  };

  const validateSignup = function() {
    const username = ($('#username').val() || '').trim();
    const password = ($('#password').val() || '').trim();
    const city = ($('#city').val() || '').trim();
    const state = ($('#state').val() || '').trim();
    const radius = ($('#radius').val() || '').trim();

    if (!validateUserName(username) || !validatePassword(password)) {
      return false;
    }

    if (city === '' || city.length > 255) {
      return toast('City name required', 3000, 'rounded');
    }

    if (state === '') {
      return toast('State required', 3000, 'rounded');
    }

    if (radius === '') {
      return toast('Radius required', 3000, 'rounded');
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

      $xhr.done(() => {
        const loggedInUser = { username, password };

        $.ajax({
          method: 'POST',
          url: '/session/',
          contentType: 'application/json',
          data: JSON.stringify(loggedInUser)
        })
        .done(() => {
          window.location.href = '/main.html';
        })
        .fail(() => {
          Materialize.toast('User could not be logged in.');
          failed = true;
        });
      });

      $xhr.fail((err) => {
        if (err.status === 401 &&
          err.responseText === 'Username already exists') {
          Materialize.toast('User name already exists', 3000, 'rounded');
          failed = true;
        }
      });

      if (failed) {
        $('#register-user').openModal();
      }
      else {
        $('#register-user').closeModal();
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
      /* eslint-disable */
      $row.append(`
        <div class="col s12 barley valign-wrapper z-depth-3">
          <div class="hops valign">
            <p>${event.artists[0].name}</p>
            <p>${event.venue.name}</p>
            <p>${moment(event.datetime).format(`dddd MMMM D, YYYY h:mma`)}</p>
            <p>${event.venue.city}, ${event.venue.region}</p>
            <div></div>
          </div>
        </div>
      `);

      /* eslint-enable */
    }
  };

  const validateSearch = function(artist, city, state) {
    if (!artist || artist === '') {
      return toast('Must provide an artist', 3000, 'rounded');
    }

    if (!city || city === '') {
      return toast('Must provide a city', 3000, 'rounded');
    }

    if (state.length !== 2) {
      return toast('Use two letter state code', 3000, 'rounded');
    }

    return true;
  };

  const searchArtist = function() {
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

      $(window).scroll(() => {
        $('#top').toggle($(document).scrollTop() > offset - 650);
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
    const $select = $('.state-wrap .select-wrapper input.select-dropdown');

    if ($target.val().trim() === '') {
      $('.state-wrap .select-wrapper+label').removeClass('valid');
      $select.addClass('invalid');
      $select.removeClass('valid');
    }
    else {
      $('.state-wrap .select-wrapper+label').addClass('valid');
      $select.addClass('valid');
      $select.removeClass('invalid');
    }
  };

  const validateStateSearchNotEmpty = function(event) {
    const $target = $(event.target);
    const $sel = $('.state-search-wrap .select-wrapper input.select-dropdown');

    if ($target.val().trim() === '') {
      $('.state-search-wrap .select-wrapper+label').removeClass('valid');
      $sel.addClass('invalid');
      $sel.removeClass('valid');
    }
    else {
      $('.state-search-wrap .select-wrapper+label').addClass('valid');
      $sel.addClass('valid');
      $sel.removeClass('invalid');
    }
  };

  const validateRadiusNotEmpty = function(event) {
    const $target = $(event.target);
    const $sel = $('.radius-wrap .select-wrapper input.select-dropdown');

    if ($target.val().trim() === '') {
      $('.radius-wrap .select-wrapper+label').removeClass('valid');
      $sel.addClass('invalid');
      $sel.removeClass('valid');
    }
    else {
      $('.radius-wrap .select-wrapper+label').addClass('valid');
      $sel.addClass('valid');
      $sel.removeClass('invalid');
    }
  };

  const checkSubmit = function(event) {
    if (event.keyCode !== 13) {
      return;
    }

    if (windowState === 0) {
      searchArtist();
    }

    if (windowState === 1) {
      loginUser();
    }

    if (windowState === 2) {
      registerUser();
    }
  };

  const openLogin = function() {
    windowState = 1;
  };

  const closeLogin = function() {
    windowState = 0;
  };

  const openSignup = function() {
    windowState = 2;
  };

  const closeSignup = function() {
    windowState = 0;
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
  $(window).scroll(() => {
    $('#top').toggle($(document).scrollTop() > 300);
  });
  $('#register-user .modal-action').on('click', registerUser);
  $('#login-user .modal-action').on('click', loginUser);
  $('#submit-search').on('click', searchArtist);
  $('#city-search, #artist-search, #city').on('keyup', validateNotEmpty);
  $('body').on('keyup', checkSubmit);
  $('#state').on('change', validateStateNotEmpty);
  $('#state-search').on('change', validateStateSearchNotEmpty);
  $('#radius').on('change', validateRadiusNotEmpty);
  $('.select-wrapper input.select-dropdown').addClass('invalid');
  $('#username-login, #username').on('keyup', checkLoginUserName);
  $('#password-login, #password').on('keyup', checkLoginPassword);
  $('#form').submit((event) => {
    event.preventDefault();
  });

// End IFFE - Must be at bottom of file.
})();
