import { useState, useEffect } from "react";

import axios from "axios";

function SuggestLocation({ givenNumberOfScreens }) {

  const [locations, setLocations] = useState([]);
  const [designsInLocation, setDesignsInLocations] = useState([]);
  const [emptyLocations, setEmptyLocations] = useState([]);
  const [matchedLocation, setMatchedLocation] = useState("");

  useEffect(() => {
    const getInLocationDesigns = async () => {
      try {
        // Getting designs that are stored in the locations
        const designResults = await axios.get(`http://localhost:4000/api/designs/search`, {
          params: {
            designStatus: "InLocation"
          }
        });

        // Extractng designs from the response body
        setDesignsInLocations(designResults.data);
      } catch (error) {
        console.error("Error while getting the designs", error);
      }
    }

    const getLocations = async () => {
      try {
        // Getting all the locations
        const locationResults = await axios.get(`http://localhost:4000/api/locations/`);

        // Extracting locations from the response body
        setLocations(locationResults.data);
      } catch (error) {
        console.error("Error while getting locations", error);
      }
    }

    getInLocationDesigns();
    getLocations();
  }, [givenNumberOfScreens]);

  // Calculating empty spaces in each location
  useEffect(() => {
    const emptyLocation = locations
      .map((location) => {
        // Getting number of stored screens in current location
        const storedScreens = designsInLocation
          .filter((design) => design.location == location.locationName)
          .reduce((totalScreens, design) => totalScreens + design.numberOfExposedScreens, 0);
      
        // Calculating number of empty spaces in each location
        const emptySpaces = location.locationCapacity - storedScreens;
    
        // Returning an object of location name and its current empty spaces
        return {
          locationName: location.locationName,
          emptySpaces: emptySpaces
        };
      });

      // Storing empty location in the state
      setEmptyLocations(emptyLocation);
  }, [locations, designsInLocation]);

  // Matching with empty locations to get the suitable location for the given number of screens
  useEffect(() => {
    const matched = emptyLocations.find((location) => location.emptySpaces >= givenNumberOfScreens);
  
    // If a match is found, set the locationName, otherwise set an empty string or a fallback value
    setMatchedLocation(matched ? matched.locationName : "No suitable location found");
  }, [emptyLocations, givenNumberOfScreens]);  

  return (
    <>
    {matchedLocation}
    </>
  );
}

export default SuggestLocation;