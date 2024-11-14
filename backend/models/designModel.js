// Importing packages
const mongoose = require("mongoose");

// Defining the design schema
const designSchema = new mongoose.Schema({
  designNumber: {
    type: Number
  },
  exposedStatus: {
    type: String
  },
  orderType: {
    type: String
  },
  numberOfColors: {
    type: Number
  },
  numberOfExposedScreens: {
    type: Number
  },
  receivedDate: {
    type: String
  },
  printRoute: {
    type: String
  },
  designName: {
    type: String
  },
  customer: {
    type: String
  },
  screenWidth: {
    type: Number
  },
  dpi: {
    type: Number
  },
  drop: {
    type: String
  },
  specialInstructions: {
    type: String
  },
  location: {
    type: String
  },
  designStatus: {
    type: String
  }
}, { timestamps: true });

const Design = mongoose.model("Design", designSchema);

module.exports = Design;