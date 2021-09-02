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
app.use(express.json());
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
    res.status(200).send(bookList);
    //Server Side Error Checking
  } catch (err) {
    console.log(err);
  }
});

app.post("/books", async (req, res) => {
  // console.log should see the json object that has the new books title, description, status and email.
  console.log(req.body)
  try {
    const newBook = await Book.create(req.body);
    res.status(201).send(newBook);
    // Book.create is making a new Book instance with the json object we sent down in our request from the front end.
  } catch (err) {
    // if we dont get what we want, we send oops information.
    res.status(401).send(err);
  }

});

app.delete("/books/:id", async (req, res) => {
  // console.log should see the specific book selected in app's personalized ID that it was given upon creation in the DB.
  console.log(req.params.id)
  try {
    await Book.findByIdAndDelete(req.params.id);
    // We are looking for a book in all of the Book schema objects that were created and finding the specific book's id.  then it is deleted from the database because thats what the findByIdAndDelete method is programed to do.
    res.status(204).send('book deleted!');
  } catch (err) {
        // if we dont get what we want, we send oops information.
    res.status(404).send(err);
  }

});

app.put("/books/:id", async (req, res) => {
   // console.log should see the specific book selected in app's personalized ID that it was given upon creation in the DB.
  console.log(req.params.id)
  // we are setting a local(in fuction only) variable called ID, that is given the value of the personalized ID sent from the front end... so that we may use it easier(aka less typing/readability) in our updateBook variable.
  const id = req.params.id;
  try {
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
    // findByIdAndUpdate is taking the unique ID and taking the req.body{like when we make a new book}, then is changing the old version of the book into the new version the user is requesting to make.
    res.status(204).send(updateBook);
  } catch (err) {
    console.log(err);
        // if we dont get what we want, we send oops information.
    res.status(404).send(`not able to update book:${req.params.id}`);
  }

});

// Default route to catch any other routes that may be entered
app.get("/*", (req, res) => {
  res.status(404).send("This is not the route you are looking for!");
});

//------------------------Listening------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
