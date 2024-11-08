import { useState } from "react";
import axios from "axios";

function DesignDetailsForm() {
  const [formData, setFormData] = useState({
    designNumber: "",
    exposedStatus: "New",
    orderType: "Direct",
    numberOfColors: "",
    numberOfExposedScreens: "",
    receivedDate: "",
    designName: "",
    customer: "",
    printRoute: "Reactive",
    screenWidth: "",
    dpi: "",
    drop: "No Drop",
    specialInstructions: "",
    location: "Not Assigned",
    currentStatus: "Awaiting Exposing",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    // Preventing refresh when submitting
    event.preventDefault();

    // Check if numberOfExposedScreens is equal or less than the numberOfColors
    if (formData.numberOfExposedScreens > formData.numberOfColors) {
      alert("Number of screens can't be greater than number of colors !");
      return;
    }

    try {
      const newDesign = await axios.post("http://localhost:4000/api/designs", {
        designNumber: formData.designNumber,
        exposedStatus: formData.exposedStatus,
        orderType: formData.orderType,
        numberOfColors: formData.numberOfColors,
        numberOfExposedScreens: formData.numberOfExposedScreens,
        receivedDate: formData.receivedDate,
        printRoute: formData.printRoute,
        designName: formData.designName,
        customer: formData.customer,
        screenWidth: formData.screenWidth,
        dpi: formData.dpi,
        drop: formData.drop,
        specialInstructions: formData.specialInstructions,
        location: formData.location,
        currentStatus: formData.currentStatus,
      });

      // Displaying a message for a successful posting
      if (newDesign) {
        alert("New design added successfully!");

        // Create screen objects in api/screens based on the number of colors
        for (let i = 0; i < formData.numberOfColors; i++) {
          await axios.post("http://localhost:4000/api/screens", {
              designNumber: formData.designNumber
          });
        }
      }

      // Clearing the form after submitting data
      setFormData({
        designNumber: "",
        exposedStatus: "New",
        orderType: "Direct",
        numberOfColors: "",
        numberOfExposedScreens: "",
        receivedDate: "",
        designName: "",
        customer: "",
        printRoute: "Reactive",
        screenWidth: "",
        dpi: "",
        drop: "No Drop",
        specialInstructions: "",
        location: "Not Assigned",
        currentStatus: "Awaiting Exposing",
      });
    } catch (error) {
      console.error("Error adding design:", error);
      alert("There was an issue adding the user. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-start min-h-screen bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2  md:w-1/2 m-2 p-2 space-y-6"
        >
          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="design-number"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Design Number
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.designNumber}
                  onChange={handleChange}
                  type="number"
                  name="designNumber"
                  id="design-number"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 lg:text-md sm:text-sm sm:leading-6"
                  min={0}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="expose-status"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Expose Status
              </label>
              <select
                required
                value={formData.exposedStatus}
                onChange={handleChange}
                id="exposedStatus"
                name="exposedStatus"
                className="mt-2 block w-full bg-gray-600 rounded-md border-0 p-2.5 text-white ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>New</option>
                <option>Re-Expose</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="order-type"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Order Type
              </label>
              <select
                required
                value={formData.orderType}
                onChange={handleChange}
                id="orderType"
                name="orderType"
                className="mt-2 block w-full bg-gray-600 rounded-md border-0 p-2.5 text-white ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Direct</option>
                <option>Commission</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="number-of-colors"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Number Of Colors
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.numberOfColors}
                  onChange={handleChange}
                  type="number"
                  name="numberOfColors"
                  id="numberOfColors"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  min={0}
                  max={15}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="number-of-screens"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Number Of Screens
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.numberOfExposedScreens}
                  onChange={handleChange}
                  type="number"
                  name="numberOfExposedScreens"
                  id="numberOfExposedScreens"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  min={0}
                  max={15}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="received-date"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Received Date
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.receivedDate}
                  onChange={handleChange}
                  type="date"
                  name="receivedDate"
                  id="receivedDate"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="design-name"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Design Name
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.designName}
                  onChange={handleChange}
                  type="text"
                  name="designName"
                  id="designName"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="customer-buyer"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Customer / Buyer
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.customer}
                  onChange={handleChange}
                  type="text"
                  name="customer"
                  id="customer"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="print-route"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Print Route
              </label>
              <select
                required
                value={formData.printRoute}
                onChange={handleChange}
                id="printRoute"
                name="printRoute"
                className="mt-2 block w-full bg-gray-600 rounded-md border-0 p-2.5 text-white ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Reactive</option>
                <option>Pigment Supersoft</option>
                <option>Pigment Discharge</option>
                <option>Glitter</option>
                <option>Nylon</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="screen-width"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Screen Width
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.screenWidth}
                  onChange={handleChange}
                  type="number"
                  name="screenWidth"
                  id="screenWidth"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  min={0}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dpi"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                DPI Value
              </label>
              <div className="mt-2">
                <input
                  required
                  value={formData.dpi}
                  onChange={handleChange}
                  type="number"
                  name="dpi"
                  id="dpi"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  min={0}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="drop"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Drop
              </label>
              <select
                required
                value={formData.drop}
                onChange={handleChange}
                id="drop"
                name="drop"
                className="mt-2 block w-full bg-gray-600 rounded-md border-0 p-2.5 text-white ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>No Drop</option>
                <option>Half Drop</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="comment"
                className="block text-md font-medium leading-6 text-gray-100"
              >
                Special Instructions
              </label>
              <div className="mt-2">
                <textarea
                  required
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder={"Add instructions..."}
                  rows={4}
                  name="specialInstructions"
                  id="specialInstructions"
                  className="block w-full bg-gray-600 rounded-md border-0 p-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="block w-32 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-md focus:outline-none focus:outline-none focus:ring-indigo-500"
            >
              Add Design
            </button>
          </div>
        </form>
        <div className="hidden lg:flex lg:w-1/2 min-h-screen flex-1 items-center justify-center m-2 p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg">
          <div className="text-center text-white px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Engraving New Designs Start Here...</h2>
            <p className="text-lg">
              Every new design begins with a simple idea. Let your creativity
              flow, and bring your imagination to life. Your journey starts
              here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignDetailsForm;
