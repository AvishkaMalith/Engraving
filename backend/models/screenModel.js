// Importing packages
const mongoose = require("mongoose");

// Defining the design schema
const screenSchema = new mongoose.Schema({
  designNumber: {
    type: Number
  },
  pitchNumber: {
    type: String
  },
  exposedType: {
    type: String
  },
  completedDate: {
    type: String
  },
  engraver: {
    type: String
  },
  endringFittedBy: {
    type: String
  },
  screenBrandAndMesh: {
    type: String
  },
  screenMaterialCode: {
    type: String
  },
  screenReferenceNumber: {
    type: String
  },
  rowScreenDocumentHeader: {
    type: String
  },
  exposedScreenDocumentHeader: {
    type: String
  },
  screenStatus: {
    type: String
  }
}, { timestamps: true });

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;