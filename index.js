require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (if any) from the public folder
app.use(express.static('public'));

// Serve the HTML file from the views folder
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for /api/whoami
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('The app is listening on port ' + listener.address().port);
});