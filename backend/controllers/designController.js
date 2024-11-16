// Importing the Design Model
const designModel = require("../models/designModel");

// Importing required packages
const mongoose = require("mongoose");

// Defining a get request to to retrieve all the designs
const getDesigns = async (req, res) => {
  try {
    const designs = await designModel.find({});
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Designs", error });
  }
};

// Defining a get request to retrieve a specific design
const getDesign = async (req, res) => {
  const designObjectId = req.params.id;

  try {
    const design = await designModel.findById(designObjectId);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the Design", error });
  }
};

// Defining a post request to add a new design
const createDesign = async (req, res) => {
  const {
    designNumber,
    exposedStatus,
    orderType,
    numberOfColors,
    numberOfExposedScreens,
    receivedDate,
    printRoute,
    designName,
    customer,
    screenWidth,
    dpi,
    drop,
    screens,
    specialInstructions,
    location,
    designStatus,
  } = req.body;

  try {
    const newDesign = await designModel.insertMany({
      designNumber,
      exposedStatus,
      orderType,
      numberOfColors,
      numberOfExposedScreens,
      receivedDate,
      printRoute,
      designName,
      customer,
      screenWidth,
      dpi,
      drop,
      screens,
      specialInstructions,
      location,
      designStatus,
    });

    res.status(200).json({
      message: "New design added successfully",
      body: newDesign,
    });
    console.log(newDesign);
  } catch (error) {
    console.error("Error while adding a new design", error);
    res
      .status(500)
      .json({ message: "An error occured while adding a new design" });
  }
};

// Defininf a get request to search for designs
const searchDesigns = async (req, res) => {
  try {
    // Retrieve query and designations from request parameters
    const { query, designStatus } = req.query;

    // Build search criteria
    const searchCriteria = {};

    // Only add designStatus to criteria if provided
    if (designStatus) {
      searchCriteria.designStatus = designStatus;
    }

    // If a query term is provided, add regex search on designName
    if (query) {
      searchCriteria.designNumber = query;
    }

    // Find screens that match the criteria
    const designs = await designModel.find(searchCriteria);

    res.json(designs);
  } catch (error) {
    console.error("Error fetching designs:", error);
    res.status(500).json({ message: "Error occurred during search", error });
  }
};

// Defining a delete request to delete a specific design
const deleteDesign = async (req, res) => {
  const { id } = req.params;

  const design = await designModel.findOneAndDelete({ _id: id });

  if (!design) {
    return res.status(400).json({ error: "No such design found" });
  }
};

// Declaring a patch request to update details of an existing design
const updateDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such design found" });
  }

  const design = await designModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!design) {
    return res.status(400).json({ error: "No such design found" });
  }

  res.status(200).json(design);
};

module.exports = {
  getDesigns,
  getDesign,
  searchDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
};
