// Importing packages
const mongoose = require("mongoose");

// Defining the design schema
const screenSchema = new mongoose.Schema({
  designNumber: {
    type: Number,
    required: false
  },
  exposedType: {
    type: String,
    required:false
  },
  completedDate: {
    type: Date,
    required: false
  },
  engraver: {
    type: String,
    required: false
  },
  screenBrandAndMesh: {
    type: String,
    required: false
  },
  screenMaterialCode: {
    type: String,
    required: false
  },
  screenReferenceNumber: {
    type: String,
    required: false
  },
  rowScreenDocumentHeader: {
    type: String,
    required: false
  },
  exposedScreenDocumentHeader: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Design = mongoose.model("Screen", screenSchema);

module.exports = Design;