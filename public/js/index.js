'use strict';

// IFFE to protect global scope - Must be at top of file.
(function () {

const validateSignup = function() {
  const username = $('#username').val().trim();
  const password = $('#password').val().trim();
  const city = $('#city').val().trim();
  let state = $('#state').val();
  let radius = $('#radius').val();

  if (state === null) {
    state = '';
  }

  if (radius === null) {
    radius = '';
  }

  state = state.trim();
  radius = radius.trim();

  if (username.length < 6 || username.length > 255) {
    Materialize.toast('User name required', 3000, 'rounded');
    return false;
  }

  if (password.length < 8 || password.length > 255) {
    Materialize.toast('Password length must be 8 or more', 3000, 'rounded');
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
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();
    const city = $('#city').val().trim();
    let state = $('#state').val();
    let radius = Number.parseInt($('#radius').val());

    const newUser = {
      user_name: username,
      password: password,
      city: city,
      state: state,
      radius: radius
    };

    let failed;
    const $xhr = $.ajax({
      method: 'POST',
      url: '/users/',
      // dataType: 'json',
      contentType: 'application/json',
      // data: '{"title": "Frozen 2: The Thaw", "rating": 6.8}'
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
      .done(() => {
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
  
};






// ****************** Establish event listeners

  $('.button-collapse').sideNav();
  $('.parallax').parallax();
  $('.modal-trigger.signup').leanModal({
    dismissible: true,
    opacity: .5,
    in_duration: 300,
    out_duration: 200,
    ready: null,
    complete: null
  });
  $('.modal-trigger.login').leanModal();
  $('select').material_select();

  $(window).scroll(function() {
    $('#top').toggle($(document).scrollTop() > 500);
  });

  $('#register-user .modal-action').on('click', registerUser);


// End IFFE - Must be at bottom of file.
})();
