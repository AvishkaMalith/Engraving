// Importing the Design Model
const screenModel = require("../models/screenModel");

// Defining a get request to to retrieve all the designs
const getScreens = async (req, res) => {
  try {
    const screens = await screenModel.find({});
    res.json(screens);
  } catch (error) {
    res.status(500).json({ message: "Error fetching screens", error })
  }
};

// Defining a get request to retrieve a specific screen
const getScreen = async (req, res) => {
  
  const screenId = req.params.id;
  
  try {
    const screen = await screenModel.findById(screenId);
    if(!screen){
      return res.status(404).json({ message : "Screen not found" });
    }
    res.json(screen);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the screen", error });
  }
};

// Defining a post request to add a new design
const createScreen = async (req, res) => {
  const {
    designNumber,
    exposedType,
    completedDate,
    engraver,
    screenBrandAndMesh,
    screenMaterialCode,
    screenReferenceNumber,
    rowScreenDocumentHeader,
    exposedScreenDocumentHeader
  } = req.body;

  try {
    const newScreen = await screenModel.create({
      designNumber,
      exposedType,
      completedDate,
      engraver,
      screenBrandAndMesh,
      screenMaterialCode,
      screenReferenceNumber,
      rowScreenDocumentHeader,
      exposedScreenDocumentHeader
    });

    res.status(200).json({
      message: "New screen added successfully",
      body: newScreen
    });
  } catch (error) {
    console.error("Error while adding a new screen", error);
    res.status(500).json({ message: "An error occured while adding a new screen" });
  }
};

// Defining a delete request to delete a specific screen
const deleteScreen = async (req, res) => {
  const { id } = req.params;
  
  const screen = await screenModel.findOneAndDelete({ _id : id });

  if(!screen){
    return res.status(400).json({ error : 'No such screen found'});
  }
}

// Declaring a patch request to update details of an existing screen
const updateScreen = async (req, res) => {
  const { id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ error : 'No such screen found'});
  }

  const screen = await screenModel.findOneAndUpdate({ _id : id }, {
      ...req.body
  });

  if(!screen){
      return res.status(400).json({ error : 'No such screen found'});
  }

  res.status(200).json(screen);
}

module.exports = {
  getScreens,
  getScreen,
  createScreen,
  updateScreen,
  deleteScreen
};