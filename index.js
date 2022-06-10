// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

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

app.get('/api/:aConvertir', function (req, res) {
	var aConvertir = req.params.aConvertir;
	if (aConvertir.indexOf('-') > -1)
		res.json({ unix: UtcToUnix(aConvertir), utc: new Date(aConvertir).toGMTString() });
	else res.json({ unix: parseInt(aConvertir), utc: unixToUtc(aConvertir) });
	// else res.json({ utc: UtcToUnix(aConvertir) });
});

// listen for requests :)
var listener = app.listen(3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});

function unixToUtc(unix) {
	var date = new Date(parseInt(unix));
	return date.toUTCString();
}

function UtcToUnix(utc) {
	var date = new Date(utc);
	return date.getTime();
}
