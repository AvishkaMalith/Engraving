// Importing packages & functions
const express = require('express');
const {
  createScreen,
  getScreens,
  getScreen,
  searchScreenOfSingleDesign,
  searchScreensOfAllDesigns,
  updateScreen,
  deleteScreen
} = require("../controllers/screenController");

// Creating the router
const router = express.Router();

// Declaring a get request to search for screens
router.get("/search", searchScreensOfAllDesigns);

// Declaring a get request to search for screens
router.get("/:designObjectId/search", searchScreenOfSingleDesign);

// Declaring a get request to get the all screens
router.get("/:designObjectId", getScreens);

// Declaring a get request to get a specific screen
router.get("/:designObjectId/:screenObjectId", getScreen);

// Declaring a post request to create a new screen
router.post("/:designObjectId", createScreen);

// Declaring a patch request to update an existing screen
router.patch("/:designObjectId/:screenObjectId", updateScreen);

// Declaring a delete request to delete an existing election
router.delete("/:id", deleteScreen);

module.exports = router;