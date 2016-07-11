'use strict';



/*
post

handling the submit of the add searched artist to favorite list

receive artist mbid from the submit and add it to the body.

Take the mbid from the body and put it in the artists_users as a new artist id saved in there all savey like.

respond with appropriate error or completion messages.

have the artists list on the side refresh and show the new artist as added.




get artists/users

no body

only triggered on users's login or page refresh.

on login populate list of favorite artists.

respond with the list as well as status code.

list will include mbid's even though they won't be displayed.
  
