// Importing the Design Model
const locationModel = require("../models/locationModel");

// Importing required packages
const mongoose = require("mongoose");

// Defining a get request to to retrieve all locations
const getLocations = async (req, res) => {
  try {
    const locations = await locationModel.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error });
  }
};

// Defining a get request to retrieve a specific location
const getLocation = async (req, res) => {
  const locationObjectId = req.params.locationObjectId;

  try {
    const location = await designModel.findById(locationObjectId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the location", error });
  }
};

// Defining a post request to add a new location
const createLocation = async (req, res) => {
  const {
    mainLocationName,
    subLocation01Name,
    subLocation02Name,
    subLocation03Name,
    locationCapacity,
    locationName,
  } = req.body;

  try {
    const newLocation = await locationModel.create({
      mainLocationName,
      subLocation01Name,
      subLocation02Name,
      subLocation03Name,
      locationCapacity,
      locationName,
    });

    res.status(200).json({
      message: "New location added successfully",
      body: newLocation,
    });
  } catch (error) {
    console.error("Error while adding a new location", error);
    res.status(500).json({ message: "An error occured while adding a new location" });
  }
};

// Defining a delete request to delete a specific design
const deleteLocation = async (req, res) => {
  const locationObjectId  = req.params.locationObjectId;

  const Location = await designModel.findOneAndDelete({ _id: locationObjectId });

  if (!location) {
    return res.status(404).json({ error: "No such location found" });
  }
};

// Declaring a patch request to update details of an existing location
const updateLocation = async (req, res) => {
  const locationObjectId = req.params.locationObjectId;

  if (!mongoose.Types.ObjectId.isValid(locationObjectId)) {
    return res.status(404).json({ error: "No such location found" });
  }

  const location = await locationModel.findOneAndUpdate( { _id: id }, { ...req.body } );

  if (!location) {
    return res.status(404).json({ error: "No such location found" });
  }

  res.status(200).json(location);
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
