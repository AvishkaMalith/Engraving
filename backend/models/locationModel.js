// Importing packages
const mongoose = require("mongoose");

// Defining the locationSchema
const locationSchema = new mongoose.Schema({
  locationName: { type: String },
  locationCapacity: { type: Number },
  locatedDesigns: [ ],
});

// Creating the locationSchema
const Location = mongoose.model("Location", locationSchema);
module.exports = { Location };