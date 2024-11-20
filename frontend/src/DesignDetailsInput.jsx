import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { MdPalette } from "react-icons/md";
import { FiTool, FiSettings } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaUsers, FaDatabase } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DesignDetailsInput() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    designNumber: "",
    exposedStatus: "New",
    numberOfColors: "",
    numberOfExposedScreens: "",
    receivedDate: new Date().toISOString().split("T")[0],
    designName: "",
    customer: "",
    printRoute: "Reactive",
    screenWidth: "",
    screens: [],
    dpi: "",
    drop: "No Drop",
    specialInstructions: "",
    location: "",
    designStatus: "AwaitingEngraving",
    lastPrintedDate: ""
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // Preventing refresh when submitting
    event.preventDefault();

    // Check if numberOfExposedScreens is equal or less than the numberOfColors
    if (Number(formData.numberOfColors) < Number(formData.numberOfExposedScreens)) {
      alert("Number of screens can't be greater than number of colors !");
      return;
    }

    try {

      for (let i = 1; i <= formData.numberOfExposedScreens; i++) {

        let screen = {};

        if (i < 10) {
          screen = {
            pitchNumber: formData.designNumber + "-P0" + i,
            exposedType: "New",
            completedDate: "",
            engraver: "",
            endringFittedBy: "",
            screenWidth: formData.screenWidth,
            screenBrandAndMesh: "",
            screenMaterialCode: "",
            screenReferenceNumber: "",
            rowScreenDocumnetHeader: "",
            exposedScreenDocumentHeader: "",
            screenStatus: "AwaitingEngraving"
          };
        } else {
          screen = {
            pitchNumber: formData.designNumber + "-P" + i,
            exposedType: "New",
            completedDate: "",
            engraver: "",
            screenWidth: formData.screenWidth,
            endringFittedBy: "",
            screenBrandAndMesh: "",
            screenMaterialCode: "",
            screenReferenceNumber: "",
            rowScreenDocumnetHeader: "",
            exposedScreenDocumentHeader: "",
            screenStatus: "AwaitingEngraving"
          };
        }

        formData.screens.push(screen);
      }

      const newDesign = await axios.post("http://localhost:4000/api/designs", {
        designNumber: formData.designNumber,
        exposedStatus: formData.exposedStatus,
        numberOfColors: formData.numberOfColors,
        numberOfExposedScreens: formData.numberOfExposedScreens,
        receivedDate: formData.receivedDate,
        printRoute: formData.printRoute,
        designName: formData.designName,
        customer: formData.customer,
        screenWidth: formData.screenWidth,
        screens: formData.screens,
        dpi: formData.dpi,
        drop: formData.drop,
        specialInstructions: formData.specialInstructions,
        location: formData.location,
        designStatus: formData.designStatus,
        lastPrintedDate: formData.lastPrintedDate
      });

      // Displaying a message for a successful posting
      if (newDesign) {
        alert("New design added successfully!");
      }

      // Clearing the form after submitting data
      setFormData({
        designNumber: "",
        exposedStatus: "New",
        numberOfColors: "",
        numberOfExposedScreens: "",
        receivedDate: new Date().toISOString().split("T")[0],
        designName: "",
        customer: "",
        printRoute: "Reactive",
        screenWidth: "",
        screens: [],
        dpi: "",
        drop: "No Drop",
        specialInstructions: "",
        location: "",
        designStatus: "AwaitingEngraving",
        lastPrintedDate: ""
      });
    } catch (error) {
      console.error("Error adding design:", error);
      alert("There was an issue adding the user. Please try again.");
    }
  };

  const navigate = useNavigate();

  const navigation = [
    { name: "Designs", icon: MdPalette, current: true, route: "/" },
    { name: "Endring Fittings", icon: FiTool, current: false, route: "/ScreensEndringFitting" },
    { name: "Screen Locations", icon: GoLocation, current: false, route: "/ScreensLocation" },
    { name: "Screen Warehouse", icon: FaDatabase, current: false, route: "/ScreenWarehouse" },
    { name: "Design Details", icon: HiDocumentText, current: false, route: "/" },
    { name: "Employees", icon: FaUsers, current: false, route: "/" },
    { name: "Settings", icon: FiSettings, current: false, route: "/" },
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://www.teejay.com/templates/assets/img/teejay_logo.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <button
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-600 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                                  )}
                                  onClick={() => navigate(item.route)}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-800"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Tom Cook</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-co">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://www.teejay.com/templates/assets/img/teejay_logo.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <button
                          className={classNames(
                            item.current
                              ? "bg-gray-600 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                          )}
                          onClick={() => navigate(item.route)}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          <main>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 pt-10">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="design-number"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Design Number
                    </label>
                    <input
                      required
                      value={formData.designNumber}
                      onChange={handleChange}
                      type="number"
                      name="designNumber"
                      id="design-number"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      min={0}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="number-of-colors"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Number Of Colors
                    </label>
                    <input
                      required
                      value={formData.numberOfColors}
                      onChange={handleChange}
                      type="number"
                      name="numberOfColors"
                      id="numberOfColors"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      min={0}
                      max={15}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="number-of-screens"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Number Of Screens
                    </label>
                    <input
                      required
                      value={formData.numberOfExposedScreens}
                      onChange={handleChange}
                      type="number"
                      name="numberOfExposedScreens"
                      id="numberOfExposedScreens"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      min={0}
                      max={15}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="received-date"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Received Date
                    </label>
                    <input
                      required
                      value={formData.receivedDate}
                      onChange={handleChange}
                      type="date"
                      name="receivedDate"
                      id="receivedDate"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="design-name"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Design Name
                    </label>
                    <input
                      required
                      value={formData.designName}
                      onChange={handleChange}
                      type="text"
                      name="designName"
                      id="designName"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-buyer"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Customer / Buyer
                    </label>
                    <input
                      required
                      value={formData.customer}
                      onChange={handleChange}
                      type="text"
                      name="customer"
                      id="customer"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="screen-width"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Screen Width
                    </label>
                    <input
                      required
                      value={formData.screenWidth}
                      onChange={handleChange}
                      type="number"
                      name="screenWidth"
                      id="screenWidth"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      min={0}
                      max={2000}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dpi"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      DPI
                    </label>
                    <input
                      required
                      value={formData.dpi}
                      onChange={handleChange}
                      type="number"
                      name="dpi"
                      id="dpi"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      min={0}
                      max={5000}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="print-route"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Print Route
                    </label>
                    <select
                      required
                      value={formData.printRoute}
                      onChange={handleChange}
                      id="printRoute"
                      name="printRoute"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option>Reactive</option>
                      <option>Pigment Supersoft</option>
                      <option>Pigment Discharge</option>
                      <option>Glitter</option>
                      <option>Nylon</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="drop"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Drop
                    </label>
                    <select
                      required
                      value={formData.drop}
                      onChange={handleChange}
                      id="drop"
                      name="drop"
                      className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value={"No Drop"}>No Drop</option>
                      <option value={"Half Drop"}>Half Drop</option>
                    </select>
                  </div>

                </div>



                <div className="mt-6">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-semibold text-gray-200 mb-2"
                  >
                    Special Instructions
                  </label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder="Add instructions..."
                    rows={4}
                    name="specialInstructions"
                    id="specialInstructions"
                    className="w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Add Design
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default DesignDetailsInput;
