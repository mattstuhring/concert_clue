#ERD info:
users
  first_name nullable - not used currently
  last_name nullable - not used currently
  email nullable - not used currently
  user_name notNullable()
  hashed_password notNullable()
  city notNullable()
  state notNullable() char(2)
  radius (default to 150) integer() notNullable()
  timestamps()

artists


artists_users

--------------------------------------------------------------------------------

#API Documentation:
http://www.bandsintown.com/api/overview

--------------------------------------------------------------------------------

#Example API Queries
##Example query with multi-artist and radius:
http get "http://api.bandsintown.com/events/search?api_version=2.0&artists[]=Adele&artists[]=Kiss&location=Seattle,WA&radius=150&format=json&app_id=CHADTEST"

``` json
HTTP/1.1 200 OK
Cache-Control: private, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 2991
Content-Type: application/json; charset=utf-8
Date: Thu, 07 Jul 2016 23:08:41 GMT
ETag: "1b7522179988300bb4f7eac5716e7010"
Server: nginx
X-Runtime: 33

[
    {
        "artists": [
            {
                "mbid": "98b67ebc-5606-4cdb-9787-47b12cceb101",
                "name": "Kiss",
                "url": "http://www.bandsintown.com/Kiss"
            }
        ],
        "datetime": "2016-07-10T19:30:00",
        "id": 11840373,
        "on_sale_datetime": "2016-04-15T10:00:00",
        "ticket_status": "available",
        "ticket_url": "http://www.bandsintown.com/event/11840373/buy_tickets?app_id=CHADTEST&came_from=233",
        "url": "http://www.bandsintown.com/event/11840373?app_id=CHADTEST",
        "venue": {
            "city": "Kennewick",
            "country": "United States",
            "id": 702533,
            "latitude": 46.219769,
            "longitude": -119.216582,
            "name": "Toyota Center Kennewick",
            "region": "WA",
            "url": "http://www.bandsintown.com/venue/702533"
        }
    },
    {
        "artists": [
            {
                "mbid": "1de93a63-3a9f-443a-ba8a-a43b5fe0121e",
                "name": "Adele",
                "url": "http://www.bandsintown.com/Adele"
            }
        ],
        "datetime": "2016-07-20T19:30:00",
        "id": 11065202,
        "on_sale_datetime": "2015-12-17T18:00:00",
        "ticket_status": "available",
        "ticket_url": "http://www.bandsintown.com/event/11065202/buy_tickets?app_id=CHADTEST&came_from=233",
        "url": "http://www.bandsintown.com/event/11065202?app_id=CHADTEST",
        "venue": {
            "city": "Vancouver",
            "country": "Canada",
            "id": 929358,
            "latitude": 49.277842,
            "longitude": -123.110153,
            "name": "Rogers Arena",
            "region": "BC",
            "url": "http://www.bandsintown.com/venue/929358"
        }
    },
    {
        "artists": [
            {
                "mbid": "1de93a63-3a9f-443a-ba8a-a43b5fe0121e",
                "name": "Adele",
                "url": "http://www.bandsintown.com/Adele"
            }
        ],
        "datetime": "2016-07-21T19:30:00",
        "id": 11065205,
        "on_sale_datetime": "2015-12-17T18:00:00",
        "ticket_status": "available",
        "ticket_url": "http://www.bandsintown.com/event/11065205/buy_tickets?app_id=CHADTEST&came_from=233",
        "url": "http://www.bandsintown.com/event/11065205?app_id=CHADTEST",
        "venue": {
            "city": "Vancouver",
            "country": "Canada",
            "id": 929358,
            "latitude": 49.277842,
            "longitude": -123.110153,
            "name": "Rogers Arena",
            "region": "BC",
            "url": "http://www.bandsintown.com/venue/929358"
        }
    },
    {
        "artists": [
            {
                "mbid": "1de93a63-3a9f-443a-ba8a-a43b5fe0121e",
                "name": "Adele",
                "url": "http://www.bandsintown.com/Adele"
            }
        ],
        "datetime": "2016-07-25T19:30:00",
        "id": 11063049,
        "on_sale_datetime": "2015-12-17T10:00:00",
        "ticket_status": "available",
        "ticket_url": "http://www.bandsintown.com/event/11063049/buy_tickets?app_id=CHADTEST&came_from=233",
        "url": "http://www.bandsintown.com/event/11063049?app_id=CHADTEST",
        "venue": {
            "city": "Seattle",
            "country": "United States",
            "id": 276192,
            "latitude": 47.6221261,
            "longitude": -122.354016,
            "name": "KeyArena",
            "region": "WA",
            "url": "http://www.bandsintown.com/venue/276192"
        }
    },
    {
        "artists": [
            {
                "mbid": "1de93a63-3a9f-443a-ba8a-a43b5fe0121e",
                "name": "Adele",
                "url": "http://www.bandsintown.com/Adele"
            }
        ],
        "datetime": "2016-07-26T19:30:00",
        "id": 11063050,
        "on_sale_datetime": "2015-12-17T10:00:00",
        "ticket_status": "available",
        "ticket_url": "http://www.bandsintown.com/event/11063050/buy_tickets?app_id=CHADTEST&came_from=233",
        "url": "http://www.bandsintown.com/event/11063050?app_id=CHADTEST",
        "venue": {
            "city": "Seattle",
            "country": "United States",
            "id": 276192,
            "latitude": 47.6221261,
            "longitude": -122.354016,
            "name": "KeyArena",
            "region": "WA",
            "url": "http://www.bandsintown.com/venue/276192"
        }
    }
]
```
--------------------------------------------------------------------------------

##Example query for an artist by Music Brainz ID
http get "http://api.bandsintown.com/artists/mbid_1de93a63-3a9f-443a-ba8a-a43b5fe0121e?api_version=2.0&format=json&app_id=CHADTEST"

HTTP/1.1 200 OK
Cache-Control: private, max-age=0, must-revalidate
Connection: keep-alive
Content-Length: 308
Content-Type: application/json; charset=utf-8
Date: Thu, 07 Jul 2016 23:07:01 GMT
ETag: "749fa9f780d8e53eea5077f7a4aafe17"
Server: nginx
X-Runtime: 17

{
    "facebook_page_url": null,
    "facebook_tour_dates_url": null,
    "image_url": "https://s3.amazonaws.com/bit-photos/large/6115532.jpeg",
    "mbid": "1de93a63-3a9f-443a-ba8a-a43b5fe0121e",
    "name": "Adele",
    "thumb_url": "https://s3.amazonaws.com/bit-photos/thumb/6115532.jpeg",
    "tracker_count": 3539295,
    "upcoming_event_count": 54
}

--------------------------------------------------------------------------------

--- The artists search will only EVER return 1 artist or empty.
HTTP GET "http://api.bandsintown.com/artists/Boston.json?api_version=2.0&app_id=CHADTEST"

--------------------------------------------------------------------------------

--- Natasha Example testing logged in session
http :8000/player/ "cookie: loggedIn=true; paddles=eyJ1c2VySWQiOjEsImxlYWd1ZUlkIjoxfQ==; paddles.sig=jaZXHZ30Fe9oM3FK72gcAjfth8Q;"

http post :8000/session username=chadlatham password=test1234

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: text/plain; charset=utf-8
Date: Tue, 12 Jul 2016 19:36:41 GMT
ETag: W/"2-4KoCHiHd29bYzs7HHpz1ZA"
Set-Cookie: loggedIn=true; Path=/
Set-Cookie: concert-clue=eyJ1c2VySWQiOjJ9; path=/; httponly
Set-Cookie: concert-clue.sig=roA-M-3KAIsLOQZcv7E8dfwGtJg; path=/; httponly

OK

userId 1: mattstuhring login:
http get :8000/users/artists "cookie: loggedIn=true; concert-clue=eyJ1c2VySWQiOjF9; concert-clue.sig=H9zBuK0OsCusQ5wJhUYdTZbFLXA;"

userId 2 chadlatham login:
http get :8000/users/artists "cookie: loggedIn=true; concert-clue=eyJ1c2VySWQiOjJ9; concert-clue.sig=roA-M-3KAIsLOQZcv7E8dfwGtJg;"

userId 3: setfloat login:
http get :8000/users/artists "cookie: loggedIn=true; concert-clue=eyJ1c2VySWQiOjN9; concert-clue.sig=0f3myt26O4Bhew9KwAAdK8DWYS8;"

userId 4: stantheman login:
http get :8000/users/artists "cookie: loggedIn=true; concert-clue=eyJ1c2VySWQiOjR9; concert-clue.sig=8bdtpf6MPoQvfPgESSNMznUostU;"

To post to Mudvayne to a logged in user
Mudvayne mbid = f1c8da15-b408-4149-b863-f1cbe9971f19
http post :8000/users/artists mbid=f1c8da15-b408-4149-b863-f1cbe9971f19 "cookie: loggedIn=true; concert-clue=eyJ1c2VySWQiOjN9; concert-clue.sig=0f3myt26O4Bhew9KwAAdK8DWYS8;"
