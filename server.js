'use strict';

//----------------------Dependencies-----------------------
const express = require('express');
const cors = require('cors');

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('connected to mongo');
});

// Import BookSchema
const Book = require('./BookSchema.js');

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
});

app.get('/books', (req, res) => {
  res.status(200).send(Book);
});

// Default route to catch any other routes that may be entered
app.get('/*', (req, res) => {
  res.status(404).send('This is not the route you are looking for!');
});

//-------------------Functions and Classes--------------


//------------------------Seeding DB------------------------
async function createBook(){
  const Book1 = new Book({
    title: 'Little House on the Prarie',
    description: 'The trials and tribulations of a young girl on the prarie',
    status: 'available',
    email: 'littlejohn@aol.com'
  });

  const Book2 = new Book({
    title: 'Little Women',
    description: 'The trials and tribulations of a young girl',
    status: 'available',
    email: 'littlejohn@aol.com'
  });
  const Book3 = new Book({
    title: 'Little Luna',
    description: 'The trials and tribulations of a little dog',
    status: 'available',
    email: 'littlejohn@aol.com'
  });
  await Book1.save();
  await Book2.save();
  await Book3.save();
  console.log('books saved');
  mongoose.disconnect();
}

createBook();


//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
