/* handling get request to ./artists/events

A properly formed get request to /artist/events must be an array of mbid's in the body.

The body will simply JSON.parse()  it will be a jsonrequest as the body.  we'll do some stringifcation and

if we don't receive a properly formed body in the request, we'll respond with a 401 error.




router.get('/artists/events')
