'use strict'

//----------------------Dependencies-----------------------
const express = require('express');
const cors = require('cors');
// getting-started.js
const mongoose = require('mongoose');

//------------------------Configs--------------------------
const app = express();
main().catch(err => console.log(err));

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

//-------------------Functions and Classes--------------
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));