var express = require('express');
var app = express();
var https = require('https');
var FormData = require('form-data');
var util = require('util');
var https = require('https');

var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/oauth/ig', function (req, res) {
  var form = new FormData();
  form.append('client_id','fc50049ba7df49b7b96535f892642366')
  form.append('client_secret','6658e18d25e740e691c0cdcdd9adeabf')
  form.append('grant_type','authorization_code')
  form.append('redirect_uri','http://localhost:1992/oauth/ig')
  form.append('code',req.query.code)
  form.submit({hostname: "api.instagram.com", path: "/oauth/access_token", protocol: 'https:'}, (error, response) => {
    console.log(error);
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    console.log(util.inspect(response));
    console.log(JSON.stringify(response.body));
    var body = "";
    response.on('readable', function() {
        body += response.read();
    });
    response.on('end', function() {
        console.log(body);
        res.send(body);
    });
  });
})

app.post('/ig/follow', function(req, res) {
    console.log(req.query.friend_id);
    var theAccess = req.query.access_token;
    var form = new FormData();
    form.append('access_token', theAccess);
    form.append('action', 'follow');
    form.submit({hostname: "api.instagram.com", path: `/v1/users/${req.query.friend_id}/relationship?access_token=${theAccess}`, protocol: 'https:'}, (error, response) => {
      var body = "";
      response.on('readable', function() {
          body += response.read();
      });
      response.on('end', function() {
          console.log(body);
          res.send(body);
      });
    });
});

app.get('/oauth/fb', function (req, res) {

    https.get('https://graph.facebook.com/v2.3/oauth/access_token?client_id=134558940334255&redirect_uri=http://localhost:1992/oauth/fb&client_secret=e485181d992009910034bbda611eda66&code=' + req.query.code, (response) => {

	    console.log(req.query.code);
	   	console.log(response);

	    var body = "";
	    response.on('readable', function() {
	        body += response.read();
	    });
	    response.on('end', function() {
	        console.log(body);
	        res.send(body);
	    });

  	});
})

app.get('/oauth/gh', function (req, res) {

    https.get('https://github.com/login/oauth/access_token?client_id=89221658f77bf282f490&client_secret=11f6d9c96c884834e4d3c4cfc0b8cd5c32231c52&code=' + req.query.code + '&redirect_uri=http://localhost:1992/oauth/gh', (response) => {

	    console.log(req.query.code);

	    var body = "";
	    response.on('readable', function() {
	        body += response.read();
	    });
	    response.on('end', function() {
	        console.log(body);
	        res.send(body);
	    });

  	});
})

app.post('/snapchat/save/:snapchat_id/', function(req, res) {
  console.log("Save Snapchat Id");
  // Get user calling function
  var snapchatId = req.params.snapchat_id
  // Save to AWS
});

app.post('/:friend_id/follow_all', function(req, res) {
  console.log("Follow all called.");
  // Get user calling function
  // Get friend to follow
  var friendId = req.params.friend_id
  // Get all social profiles attached to friend
  // For each social profile, follow them if we can.
});

var server = app.listen(1992, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
