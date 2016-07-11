'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const ev = require('experss-validation');
const validations = require('../validations/joiusers');

/*
post

on initial search do a get request to artists
  if we do nto have a result in the artists table

  node get request to bandsintown for the artist

  feed response filtered by user request fields to a searchReturnCard on the logged in users screen. this card will be immediately beneeath the search bar, and will delete any prexisting searchReturnCard

  if user clicks to add to their favorites
    send a post request to routes /artists/users

  if artist doesn't exist in table {
    add the relevant info to the artists table
  }

  then add foreign key into the artists_users table.

  Visually .push() add the artist to the sidebar of favorites. delete sidebar and rewrite sidebar.

  rewipe the upcoming shows to ensure the new artists results are shown

/

delete

on click of delete of favorite artist sidebar
  send a router.delete() to the artists/users route.
  Delete artist from artists_users table.
  Remove artist from favorites sidebar.
  refresh the upcoming shows to ensure the removed artists' concerts are no longer there.

/
