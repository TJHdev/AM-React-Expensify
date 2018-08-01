const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public')

app.use(express.static(publicPath)); // express app that serves up all assets from this directory

// sets up a function to run every time a get request is made
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('server is up!');
});