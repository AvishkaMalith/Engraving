// Importing the Design Model
const { Location } = require("../models/locationModel");

// Importing required packages
const mongoose = require("mongoose");

// Defining a get request to to retrieve all locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error });
  }
};

// Defining a get request to retrieve a specific location
const getLocation = async (req, res) => {
  const locationObjectId = req.params.locationObjectId;

  try {
    const location = await Location.findById(locationObjectId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the location", error });
  }
};

// Defining a post request to add a new location
const createLocation = async (req, res) => {
  const { locationName, locationCapacity, locatedDesigns } = req.body;

  try {
    const newLocation = await Location.create({
      locationName,
      locationCapacity,
      locatedDesigns,
    });

    res.status(200).json({
      message: "New location added successfully",
      body: newLocation,
    });
  } catch (error) {
    console.error("Error while adding a new location", error);
    res
      .status(500)
      .json({ message: "An error occured while adding a new location" });
  }
};

// Defining a post request to add a design to a specific location
const addToLocation = async (req, res) => {
  try {
    // Getting the location Object Id and the designNumber
    const locationObjectId = req.params.locationObjectId;
    const designNumber = Number(req.params.designNumber);

    // Validating locationObjectId
    if (!mongoose.Types.ObjectId.isValid(locationObjectId)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }

    // Adding the design number to the location document
    const location = await Location.findByIdAndUpdate(
      locationObjectId,
      { $push: { locatedDesigns: designNumber } },
      { new: true }
    );

    // Checking if the location was found
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      message: "Design Number added successfully",
      updatedLocation: location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding the design to the location",
      error: error.message,
    });
  }
};

// Defining a delete request to remove a design from a specific location
const removeFromLocation = async (req, res) => {
  try {
    // Getting the location Object Id and the designNumber
    const locationObjectId = req.params.locationObjectId;
    const designNumber = Number(req.params.designNumber);

    // Validating locationObjectId
    if (!mongoose.Types.ObjectId.isValid(locationObjectId)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }

    // Validating designNumber
    if (isNaN(designNumber)) {
      return res.status(400).json({ message: "Invalid design number" });
    }

    // Adding the design number to the location document
    const location = await Location.findByIdAndUpdate(
      locationObjectId,
      { $pull: { locatedDesigns: designNumber } },
      { new: true }
    );

    // Checking if the location was found
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      message: "Design Number added successfully",
      updatedLocation: location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding the design to the location",
      error: error.message,
    });
  }
};

// Defining a delete request to delete a specific design
const deleteLocation = async (req, res) => {
  const locationObjectId = req.params.locationObjectId;

  const location = await Location.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(locationObjectId),
  });

  if (!location) {
    return res.status(404).json({ error: "No such location found" });
  }

  res.status(404).json({ message: "location deleted successfully" });
};

// Declaring a patch request to update details of an existing location
const updateLocation = async (req, res) => {
  const locationObjectId = req.params.locationObjectId;

  if (!mongoose.Types.ObjectId.isValid(locationObjectId)) {
    return res.status(404).json({ error: "No such location found" });
  }

  const location = await Location.findOneAndUpdate(
    { _id: locationObjectId },
    { ...req.body }
  );

  if (!location) {
    return res.status(404).json({ error: "No such location found" });
  }

  res.status(200).json(location);
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  addToLocation,
  removeFromLocation,
  updateLocation,
  deleteLocation,
};
