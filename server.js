"use strict";

//----------------------Dependencies-----------------------
const express = require("express");
const cors = require("cors");

// getting-started.js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("connected to mongo");
});
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://dev-qttzuf0f.us.auth0.com/.well-known/jwks.json'
});

// Import BookSchema
const Book = require("./BookSchema.js");

//------------------------Configs--------------------------
const app = express();
app.use(cors());
app.use(express.json());
// Import and config the dotenv
require("dotenv").config();

// Designate the port
const PORT = process.env.PORT;

// --------- AUTH0 header stuff ---------
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

//-------------------------Routes--------------------------
// Set up the primary "root" route
app.get("/", (req, res) => {
  res.send("TESTING!!");
});

app.get("/books", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      // find the books that belong to the user with that email address
      let userEmail = user.email;
      Book.find({ email: userEmail }, (err, books) => {
        console.log(books);
        res.send(books);
      });
    }
  });
});


app.post("/books", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      const newBook = new Book({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        email: user.email
      });
      newBook.save((err, saveBookData) => {
        res.send(saveBookData);
      });
    }
  });
});

app.delete("/books/:id", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      let bookId = req.params.id;
      Book.deleteOne({ _id: bookId, email: user.email })
        .then(deleteBookData => {
          console.log(deleteBookData);
          res.send('deleted the book');
        });
    }
  });
});

app.put("/books/:id", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.status(500).send('invalid token');
    } else {
      Book.findOne({_id: req.params.id, email: user.email}).then(foundBook => {
        console.log(foundBook);
        foundBook.title = req.body.title;
        foundBook.description = req.body.description;
        foundBook.save()
        .then(savedBook => res.send(savedBook));
      });
    };
  });
});

// Default route to catch any other routes that may be entered
app.get("/*", (req, res) => {
  res.status(404).send("This is not the route you are looking for!");
});

//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
