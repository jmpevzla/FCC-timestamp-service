// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

const invalid = 'Invalid Date';

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  
  if (!dateParam) {
    const date = new Date();
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } 
 
  const unixTime = Number(dateParam);
  let date;
  if (isNaN(unixTime)) {
    date = new Date(dateParam);
  } else {
    date = new Date(unixTime);
  }
  
  if (date.toString() === invalid) {
    return res.json({
      error: invalid
    });
  }
  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
