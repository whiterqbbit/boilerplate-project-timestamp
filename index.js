// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// listen for requests :)
var listener = app.listen(port, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});


app.get('/api/', function (req, res) {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get('/api/:date', function (req, res) {
  var date = req.params.date;
  let integerReg = /^\d+$/;
	let response = {};
	console.log('received : ', date);
	if (date.includes('-')) {
		response.unix = UtcToUnix(date);
		response.utc = new Date(date).toGMTString();
	} else if (integerReg.test(date)) {
		response.unix = parseInt(date);
		response.utc = unixToUtc(date);
	}
	if (!response.utc || !response.unix ) {
		response = { error: 'Invalid Date' };
	}
	res.json(response);
});

function unixToUtc(unix) {
	var date = new Date(parseInt(unix));
	return date.toUTCString();
}

function UtcToUnix(utc) {
	var date = new Date(utc);
	return date.getTime();
}
