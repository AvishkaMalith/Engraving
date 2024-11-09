// Importing packages & functions
const express = require('express');
const {
  createScreen,
  getScreens,
  getScreen,
  searchScreens,
  updateScreen,
  deleteScreen
} = require("../controllers/screenController");

// Creating the router
const router = express.Router();

// Declaring a get request to get the all screens
router.get("/", getScreens);

// Declaring a get request to search for screens
router.get("/search", searchScreens);

// Declaring a get request to get a specific screen
router.get("/:id", getScreen);

// Declaring a post request to create a new screen
router.post("/", createScreen);

// Declaring a patch request to update an existing screen
router.patch("/:id", updateScreen);

// Declaring a delete request to delete an existing screen
router.delete("/:id", deleteScreen);

module.exports = router;