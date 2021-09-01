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

// Import BookSchema
const Book = require("./BookSchema.js");
const { request } = require("express");

//------------------------Configs--------------------------
const app = express();
app.use(cors());

// Import and config the dotenv
require("dotenv").config();

// Designate the port
const PORT = process.env.PORT;

//-------------------------Routes--------------------------
// Set up the primary "root" route
app.get("/", (req, res) => {
  res.send("TESTING!!");
});

app.get("/books", async (req, res) => {
  // Frontend request to server-------------------
  const user = {};
  //if front end made a request-------------------
  if (req.query.email) {
    user.email = req.query.email;
  }
   console.log(user);
  try {
    const bookList = await Book.find({})
    // res.send(book);
    console.log(bookList);
    // res.status(200).send(bookList);
  } catch (err) {
    console.log(err);
  }
});

// Default route to catch any other routes that may be entered
app.get("/*", (req, res) => {
  res.status(404).send("This is not the route you are looking for!");
});

//-------------------Functions and Classes-----------------

//------------------------Seeding DB-----------------------

// createBook();

//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
