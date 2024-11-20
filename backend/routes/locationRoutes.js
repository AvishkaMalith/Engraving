// Importing packages & functions
const express = require('express');
const {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation
} = require("../controllers/locationController");

// Creating the router
const router = express.Router();

// Declaring a get request to get the all locations
router.get("/", getLocations);

// Declaring a get request to get a specific location
router.get("/:id", getLocation);

// Declaring a post request to create a new election
router.post("/", createLocation);

// Declaring a patch request to update an existing election
router.patch("/:id", updateLocation);

// Declaring a delete request to delete an existing election
router.delete("/:id", deleteLocation);

module.exports = router;