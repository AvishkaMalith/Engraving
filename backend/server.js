// Defining the constants
const port = 4000;
const mongoDBURL = "mongodb://localhost:27017/Engraving";

// Importing packages, routes and functions
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const designRoutes = require("./routes/designRoutes");

// Creating an express app
const app = express();

// Defining the middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Defining the routes
app.use("/api/designs", designRoutes);

// Connecting to the MongoDB
mongoose.connect(mongoDBURL)
  .then(() => {
  // Listening for requests
  app.listen(port, () => {
    console.log("\nConnected to DB & Listening on port : " + port);
  });
}).catch((error) => {
  console.error("Failed to connect with MongoDB", error);
});