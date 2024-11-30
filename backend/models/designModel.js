// Importing packages
const mongoose = require("mongoose");

// Importing the screenSchema
const screenSchema = require("./screenSchema");

// Defining the design schema
const designSchema = new mongoose.Schema(
  {
    designNumber: { type: Number },
    exposedStatus: { type: String },
    orderType: { type: String },
    numberOfColors: { type: Number },
    numberOfExposedScreens: { type: Number },
    receivedDate: { type: String },
    printRoute: { type: String },
    designName: { type: String },
    customer: { type: String },
    screenWidth: { type: String },
    dpi: { type: Number },
    drop: { type: String },
    screens: [screenSchema],
    specialInstructions: { type: String },
    location: { type: String },
    designStatus: { type: String },
    lastPrintedDate: { type: String },
  },
  { timestamps: true }
);

// Creating and exposrting the design model
const Design = mongoose.model("Design", designSchema);
module.exports = Design;
