'use strict'

//----------------------Dependencies-----------------------
const express = require('express');
const cors = require('cors');

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('http://localhost:3001');

// Import BookSchema
const Book = require('./Schemas/BookSchema.js');

//------------------------Configs--------------------------
const app = express();
app.use(cors());

// Import and config the dotenv
require('dotenv').config();


// Designate the port
const PORT = process.env.PORT;

//-------------------------Routes--------------------------
// Set up the primary "root" route
app.get('/', (req, res) => {
  res.send('TESTING!!');
})

app.get('/books', (req, res) => {
  res.status(200).send(Book);
})

// Default route to catch any other routes that may be entered
app.get('/*', (req, res) => {
  res.status(404).send('This is not the route you are looking for!');
})

//-------------------Functions and Classes--------------


//------------------------Seeding DB------------------------
async function seed() {

  const Book1 = new Book({
    title: 'Little House on the Prarie',
    description: 'The trials and tribulations of a young girl on the prarie',
    status: 'available',
    email: 'littlejohn@aol.com'
  })

  
  await Book1.save( function(err) {
    if (err) console.log('You screwed up!');
    else console.log('You ROCK!');
  });


  await Book.create({
    title: 'Little Women',
    description: 'The trials and tribulations of a young girl',
    status: 'available',
    email: 'littlejohn@aol.com'
  })

  await Book.create({
    title: 'Little Luna',
    description: 'The trials and tribulations of a little dog',
    status: 'available',
    email: 'littlejohn@aol.com'
  })

  mongoose.disconnect();
}

seed();

//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));