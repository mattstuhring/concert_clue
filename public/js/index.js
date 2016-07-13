'use strict';

$('.button-collapse').sideNav();
$('.parallax').parallax();
$('.modal-trigger').leanModal();
$('select').material_select();

$(function(){
  $(window).scroll(function() {
    $('#top').toggle($(document).scrollTop() > 500);
  });
})

// IFFE to protect global scope - Must be at top of file.
(function () {


// End IFFE - Must be at bottom of file.
})();
