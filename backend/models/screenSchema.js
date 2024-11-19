// Importing packages
const mongoose = require("mongoose");

// Defining the design schema
const screenSchema = new mongoose.Schema({
  pitchNumber: { type: String },
  exposedType: { type: String },
  completedDate: { type: String },
  engraver: { type: String },
  screenWidth: { type: Number },
  endringFittedBy: { type: String },
  screenBrandAndMesh: { type: String },
  screenMaterialCode: { type: String },
  screenReferenceNumber: { type: String },
  rowScreenDocumentHeader: { type: String },
  exposedScreenDocumentHeader: { type: String },
  screenStatus: { type: String },
});

module.exports = screenSchema;
