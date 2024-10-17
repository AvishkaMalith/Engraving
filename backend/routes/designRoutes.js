// Importing packages & functions
const express = require('express');
const {
  createDesign,
  getDesigns,
  getDesign,
  updateDesign,
  deleteDesign
} = require("../controllers/designController");

// Creating the router
const router = express.Router();

// Declaring a get request to get the all elections
router.get("/", getDesigns);

// Declaring a get request to get a specific election
router.get("/:id", getDesign);

// Declaring a post request to create a new election
router.post("/", createDesign);

// Declaring a patch request to update an existing election
router.patch("/:id", updateDesign);

// Declaring a delete request to delete an existing election
router.delete("/:id", deleteDesign);

module.exports = router;