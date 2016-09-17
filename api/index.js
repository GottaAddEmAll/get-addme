var express = require('express')
var stormpath = require('express-stormpath');
var app = express()
var bodyParser = require('body-parser')
var FB = require('fb');

app.use(stormpath.init(app, {
  expand: {
    customData: true,
  },
  web: {
    produces: ['application/json']
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/notes', stormpath.apiAuthenticationRequired, function(req, res) {
  res.json({notes: req.user.customData.notes || "This is your notebook. Edit this to start saving your notes!"})
})

app.post('/notes', stormpath.apiAuthenticationRequired, function(req, res) {
  if(!req.body.notes || typeof req.body.notes != "string") {
    res.status(400).send("400 Bad Request")
  } else {
    req.user.customData.notes = req.body.notes
    req.user.customData.save()
    res.status(200).end()
  }
})

app.post('/oauth/fb', stormpath.apiAuthenticationRequired, function(req, res) {
  FB.api('oauth/access_token', {
    client_id: 'b71addb8e4e81efcdc973c112bb85b81',
    client_secret: 'e76f45468d975b274e3d3548066e88db',
    redirect_uri: 'http://localhost:3000/oauth/fb',
    code: req.query.code
  }, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    var accessToken = res.access_token;
    var expires = res.expires ? res.expires : 0;
  });
})


app.listen(3000)
console.log("Listening on 3000")