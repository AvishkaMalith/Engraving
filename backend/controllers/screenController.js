const Design = require("../models/designModel");
const { ObjectId } = require("mongoose").Types;

// Defining a get request to get all screens of a specific deisgn
const getScreens = async (req, res) => {
  try {
    // Getting the designObjectId and getting its screens
    const designObjectId = req.params.designObjectId;
    const design = await Design.findById(designObjectId);

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.status(200).json(design.screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Defining a get request to get a specific screen by its ObjectId
const getScreen = async (req, res) => {
  try {
    // Getting the designObjectId and screenObjectId
    const designObjectId = req.params.designObjectId;
    const screenObjectId = new ObjectId(req.params.screenObjectId);

    // Getting the design Object
    const design = await Design.findById(designObjectId);

    // Checking if the design object is null
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Getting the screen Object from the design object
    const screen = design.screens.find((screen) =>
      screen._id.equals(screenObjectId)
    );

    // Checking if the screen object is null
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    // Delivering the screen object as a JSON
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({
      message: "An error occured while fetching the screen",
      error: error.message,
    });
  }
};

// Defining a post request to add a new screen to specific design
const createScreen = async (req, res) => {
  try {
    // Getting the designObjectId
    const designObjectId = req.params.designObjectId;

    // Fetching the design object from the database
    const design = await Design.findById(designObjectId);

    // Checking if the designObject is null
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Adding the new screen to the current design
    const newScreen = req.body;
    design.screens.push(newScreen);

    // Save the updated design document
    await design.save();

    res
      .status(201)
      .json({ message: "Screen added successfully", screens: design.screens });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding the new screen", error: error.message });
  }
};

// Defining a patch request to update an existing screen
const updateScreen = async (req, res) => {
  try {
    // Getting the designObjectId, screenObjectId and the design
    const designObjectId = req.params.designObjectId;
    const screenObjectId = new ObjectId(req.params.screenObjectId);
    const design = await Design.findById(designObjectId);

    // Checking if the design is null
    if (!design) {
      return res.status(404).json({ message: "design not found" });
    }

    // Getting the screen Object from the design object
    const updatingScreen = design.screens.find((screen) =>
      screen._id.equals(screenObjectId)
    );

    // Checking if the screens are null
    Object.assign(updatingScreen, req.body);
    await design.save();

    res
      .status(200)
      .json({
        message: "Screen updated successfully",
        updatedScreen: updatingScreen,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating the screen", error: error.message });
  }
};

// Defining a get request to search for a specific screen
const searchScreenOfSingleDesign = async (req, res) => {
  try {
    // Getting the designObjectId
    const designObjectId = req.params.designObjectId;

    // Fetching the design object from the database
    const design = await Design.findById(designObjectId);

    // Checking if the designObject is null
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Extrscting search criteria from the request parameters
    const query = req.query;
    const filteredScreens = design.screens.filter((screen) => {
      return Object.keys(query).every(
        (key) =>
          screen[key]?.toString().toLowerCase() === query[key].toLowerCase()
      );
    });

    if (filteredScreens.length === 0) {
      return res.status(404).json({ message: "No matching screen found" });
    }

    res.status(200).json(filteredScreens);
  } catch (error) {
    res.status(500).json({
      message: "Error searching for the screen",
      error: error.message,
    });
  }
};

// Defining a get request to search for screens across all designs
const searchScreensOfAllDesigns = async (req, res) => {
  try {
    const query = req.query;
    const designs = await Design.find({});

    const matchingScreens = designs.flatMap((design) =>
      design.screens.filter((screen) => {
        return Object.keys(query).every((key) =>
          screen.screenStatus?.toString().toLowerCase() === (query.screenStatus.toLowerCase())
        );
      })
    );

    if (matchingScreens.length === 0)
      return res.status(404).json({ message: "No matching screens found" });

    res.status(200).json(matchingScreens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteScreen = async (req, res) => {
  try {
    const design = await Design.findById(req.params.designId);
    if (!design) return res.status(404).json({ message: "Design not found" });

    const screenIndex = design.screens.findIndex(
      (screen) => screen.screenReferenceNumber === req.params.screenReference
    );
    if (screenIndex === -1)
      return res.status(404).json({ message: "Screen not found" });

    design.screens.splice(screenIndex, 1);
    await design.save();

    res.status(200).json({
      message: "Screen deleted successfully",
      screens: design.screens,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getScreens,
  getScreen,
  createScreen,
  updateScreen,
  searchScreenOfSingleDesign,
  searchScreensOfAllDesigns,
  deleteScreen,
};
