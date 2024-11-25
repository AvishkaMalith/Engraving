// Importing packages & functions
const express = require('express');
const {
  createLocation,
  getLocations,
  getLocation,
  addToLocation,
  removeFromLocation,
  updateLocation,
  deleteLocation
} = require("../controllers/locationController");

// Creating the router
const router = express.Router();

// Declaring a get request to get the all locations
router.get("/", getLocations);

// Declaring a get request to get a specific location
router.get("/:locationObjectId", getLocation);

// Declaring a post request to create a new location
router.post("/", createLocation);

// Declaring a patch request to add a design number to an existing location
router.patch("/addToLocation/:locationObjectId/:designNumber", addToLocation);

// Declaring a patch request to remove a design number from an existing location
router.patch("/removeFromLocation/:locationObjectId/:designNumber", removeFromLocation);

// Declaring a patch request to add a design to an existing location
router.patch("/:locationObjectId", updateLocation);

// Declaring a delete request to delete an existing election
router.delete("/:locationObjectId", deleteLocation);

module.exports = router;