const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static pages from /public
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// POST handler for the Mad Lib form
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { noun, adjective, verb, place, pluralnoun } = req.body;

  if (!noun || !adjective || !verb || !place || !pluralnoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/ITC505/lab-7/index.html">Go Back</a>
    `);
    return;
  }

  const story = `
    Once upon a time, a ${adjective} ${noun} loved to ${verb} in ${place}.
    Every day, it met many ${pluralnoun}, and they had wonderful adventures together!
  `;

  res.send(`
    <h1>Your Mad Lib Story</h1>
    <p>${story}</p>
    <a href="/ITC505/lab-7/index.html">Try Again</a>
  `);
});

// Random number test route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Port setup
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`✅ Server running on port ${port}`));
