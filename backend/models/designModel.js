// Importing packages
const mongoose = require("mongoose");

// Defining the design schema
const designSchema = new mongoose.Schema({
  designNumber: {
    type: Number,
    required: true
  },
  exposedStatus: {
    type: String,
    required: true
  },
  orderType: {
    type: String,
    required: true
  },
  numberOfColors: {
    type: Number,
    required: true
  },
  numberOfExposedScreens: {
    type: Number,
    required: true
  },
  receivedDate: {
    type: Date,
    required: true
  },
  printRoute: {
    type: String,
    required: true
  },
  designName: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  screenWidth: {
    type: Number,
    required: true
  },
  dpi: {
    type: Number,
    required: true
  },
  drop: {
    type: String,
    required: true
  },
  specialInstructions: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Design = mongoose.model("Design", designSchema);

module.exports = Design;