'use strict'

//----------------------Dependencies-----------------------
const express = require('express');
const cors = require('cors');

//------------------------Configs--------------------------
const app = express();

// Import and config the dotenv
require('dotenv').config();

// Designate the port
const PORT = process.env.PORT;

//-------------------------Routes--------------------------
// Set up the primary "root" route
app.get('/', (req, res) => {
  res.send('TESTING!!');
})

// Default route to catch any other routes that may be entered
app.get('/*', (req, res) => {
  res.status(404).send('This is not the route you are looking for!');
})

//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));