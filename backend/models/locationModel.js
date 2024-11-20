// Importing packages
const mongoose = require("mongoose");

// Defining the design schema
const locationSchema = new mongoose.Schema(
  {
    mainLocationName: { type: String },
    subLocation01Name: { type: String },
    subLocation02Name: { type: String },
    subLocation03Name: { type: String },
    locationCapacity: { type: Number },
    locationName: { type: String }
  },
  { 
    timestamps: true 
  }
);

// Creating and exposrting the design model
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;