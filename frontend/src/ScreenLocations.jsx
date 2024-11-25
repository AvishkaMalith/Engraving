import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { MdPalette, MdRemoveCircleOutline, MdAddCircleOutline } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { FiTool, FiSettings } from "react-icons/fi";
import { FaUsers, FaDatabase } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import axios from "axios";

import DaysDifference from "./CalculateDaysDifference";

const teams = [
  { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
  { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
  { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ScreensLocation() {

  const navigation = [
    { name: "Designs", icon: MdPalette, current: false, route: "/" },
    { name: "Endring Fitting", icon: FiTool, current: false, route: "/EndringFitting" },
    { name: "Add Locations", icon: MdAddCircleOutline, current: false, route: "/AddLocations" },
    { name: "Screen Locations", icon: FaDatabase, current: true, route: "/ScreensLocation" },
    { name: "Remove Locations", icon: MdRemoveCircleOutline, current: false, route: "/" },
    { name: "Endring Removing", icon: FaTools, current: false, route: "/" },
    { name: "Design Details", icon: HiDocumentText, current: false, route: "/" },
    { name: "Employees", icon: FaUsers, current: false, route: "/" },
    { name: "Settings", icon: FiSettings, current: false, route: "/" },
  ];

  // Used for navigation through pages
  const navigate = useNavigate();

  // States to handle the values
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [designs, setDesigns] = useState([]);

  const [update, setUpdate] = useState({
    isUpdating: false,
    updated: false,
    updatingLocationId: "",
    updatingDesignId: "",
    updatingDesignNumber: 0,
    updatedDesignStatusValue: "",
    updatedLastPrintedDateValue: new Date().toISOString().split("T")[0]
  });

  // Calculating stats values
  const stats = [
    {
      statIdx: 1,
      name: "Available Designs #",
      value: designs.length
    },
    {
      statIdx: 2,
      name: "Available Screens #",
      value: designs.reduce((totalScreens, design) => totalScreens + design.numberOfExposedScreens, 0)
    },
    {
      statIdx: 3,
      name: "Location Capacity #",
      value: locations.reduce((capacity, location) => capacity + location.locationCapacity, 0)
    }
  ];

  useEffect(() => {
    const getLocations = async () => {
      try {
        const locationResults = await axios.get(`http://localhost:4000/api/locations/`);

        setLocations(locationResults.data);

      } catch (error) {
        console.error("Error getting locations ", error);
      }
    }

    const getDesigns = async () => {
      try {
        const designsResults = await axios.get(`http://localhost:4000/api/designs/search`, {
          params: {
            designStatus: "InLocation"
          }
        });

        setDesigns(designsResults.data);

      } catch (error) {
        console.error("Error getting locations ", error);
      }
    }

    getDesigns();
    getLocations();

  }, [update.updated]);

  const removeDesignFromLocation = async (designId, designNumber, locationId) => {
    try {
      // Removing Design Number from the location
      const removeLocation = await axios.patch(`http://localhost:4000/api/locations/removeFromLocation/${locationId}/${designNumber}`);

      // Updating the designStatus of design object as "AwaitingEndringRemoving"
      const updateDesignStatus = await axios.patch(`http://localhost:4000/api/designs/${designId}`, {
        location: "",
        designStatus: "AwaitingEndringRemoving"
      });

      setUpdate((prevDetails) => ({
        ...prevDetails,
        updated: prevDetails.updated
      }));
    } catch (error) {
      console.error("Error updating design or locations", error);
    }
  }

  const updateLastPrintedDate = async (designId) => {
    try {
      // Updating last printed date of the clicked design object
      const updateLastPrintedDate = await axios.patch(`http://localhost:4000/api/designs/${designId}`, {
        lastPrintedDate: update.updatedLastPrintedDateValue
      });

      // Restoring state values into default values
      setUpdate((prevDetails) => ({
        ...prevDetails,
        updated: true,
        updatedLastPrintedDateValue: ""
      }));
    } catch (error) {
      console.error("Error while updating last printed date", error);
    }
  }

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
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-md leading-6 font-semibold"
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
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-3/4">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full bg-gray-800 bg-transparent border-0 border-bg-gray-800 py-0 pl-8 pr-0 text-white focus:ring-0 focus:outline-none sm:text-md"
                    placeholder="Search..."
                    type="number"
                    name="search"
                  />
                </div>
              </form>
              {/* <button
                type="button"
                className="inline-flex items-center gap-x-2 h-1/2 my-4 rounded-md bg-sky-900 px-3 py-2 text-md font-mono font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change
              </button> */}
              {/* <button               // Replace these buttons with save design details buttons
                type="button"
                className="inline-flex items-center justify-center mt-4 h-1/2 gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Re-Expose
              </button> */}
            </div>
          </div>

          <main>
            <header>
              {/* Stats */}
              <div className="grid grid-cols-1 bg-gray-900 sm:grid-cols-4 lg:grid-cols-3">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1
                        ? "sm:border-l"
                        : statIdx === 2
                          ? "lg:border-l"
                          : "",
                      "border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8"
                    )}
                  >
                    <p className="text-md font-mono leading-6 text-blue-300">
                      {stat.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-3xl font-semibold tracking-tight text-white">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="text-md text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            {/* Activity list */}
            <div className="grid grid-cols-1 bg-gray-900 sm:grid-cols-1 lg:grid-cols-2">
              {locations && locations.map((location) => (
                <div className="border-y border-white/10 bg-gray-900">
                  <div className="bg-gray-900 p-4">
                    <div className="mx-auto max-w-full">
                      <div key={location._id}
                        className={`
                          ${designs
                            .filter((design) => design.location === location.locationName)
                            .reduce((numberOfStoredScreens, design) => design.numberOfExposedScreens + numberOfStoredScreens, 0) < location.locationCapacity ?
                            (`bg-indigo-800`) : (`bg-green-800`)} py-2 my-2 rounded-md`}>
                        <div className="px-2 sm:px-6 lg:px-4">
                          <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                              <h1 className="text-lg font-semibold leading-6 text-gray-50">
                                {location.locationName}
                              </h1>
                              <p className="mt-2 text-md text-gray-50">
                                {designs
                                  .filter((design) => design.location === location.locationName)
                                  .reduce((numberOfStoredScreens, design) => design.numberOfExposedScreens + numberOfStoredScreens, 0) + " / " + location.locationCapacity}
                              </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                              {update.isUpdating && update.updatingLocationId === location._id ?
                                (
                                  <button
                                    onClick={() => setUpdate({
                                      isUpdating: false,
                                      updatingLocationId: "",
                                    })}
                                    type="button"
                                    className="block rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                  >
                                    Cancel
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setUpdate({
                                      isUpdating: true,
                                      updatingLocationId: location._id,
                                    })}
                                    type="button"
                                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                  >
                                    Update
                                  </button>)}
                            </div>
                          </div>
                          <div className="mt-2 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                  <colgroup>
                                    <col className="w-1/4"></col>
                                    <col className="w-1/4"></col>
                                    <col className="w-1/4"></col>
                                    <col className="w-1/4"></col>
                                  </colgroup>
                                  <thead className="border-b border-gray-100">
                                    <tr>
                                      <th scope="col" className="py-2 pl-4 pr-3 text-left text-md font-semibold text-yellow-500 sm:pl-0">
                                        Design #
                                      </th>
                                      <th scope="col" className="px-2 py-2 text-left text-md font-semibold text-yellow-500">
                                        {update.isUpdating && update.updatingLocationId === location._id ? "Remove" : "Screens #"}
                                      </th>
                                      <th scope="col" className="px-2 py-2 text-left text-md font-semibold text-yellow-500">
                                        Last Print
                                      </th>
                                      <th scope="col" className="px-2 py-2 text-center text-md font-semibold text-yellow-500">
                                        {update.isUpdating && update.updatingLocationId === location._id ? "" : "Days #"}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-400">
                                    {designs && designs.filter((design) => design.location === location.locationName).map((design) => (
                                      <tr key={design._id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-md font-medium text-gray-100 sm:pl-0">
                                          {design.designNumber + " / " + design.numberOfColors}
                                        </td>
                                        <td>
                                          {update.isUpdating && update.updatingLocationId === location._id ?
                                            (
                                              <button
                                                onClick={() => {
                                                  removeDesignFromLocation(design._id, design.designNumber, location._id);
                                                }}
                                                className="inline-flex items-center bg-red-900 border border-red-400 rounded hover:bg-red-800 px-3 py-1 text-sm font-medium ring-1 ring-inset text-white ring-red-500/20">
                                                Remove
                                              </button>
                                            ) : (
                                              <p className="whitespace-nowrap px-2 py-2 font-medium text-md text-gray-100">
                                                {design.numberOfExposedScreens}
                                              </p>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 font-medium text-md text-gray-100">
                                          {update.isUpdating && update.updatingLocationId === location._id ?
                                            (
                                              <input
                                                onChange={(event) => setUpdate((prevDetails) => ({
                                                  ...prevDetails,
                                                  updatedLastPrintedDateValue: event.target.value
                                                }))}
                                                defaultValue={new Date().toISOString().split("T")[0]}
                                                value={update.updatedLastPrintedDateValue}
                                                type="date"
                                                required
                                                className="p-1 text-sm font-medium text-gray-100 bg-blue-900 border border-blue-300 focus:outline-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                              />
                                            ) : (
                                              <p className="text-left">
                                                {design.lastPrintedDate}
                                              </p>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 font-medium text-center text-gray-100">
                                          {update.isUpdating && update.updatingLocationId === location._id ?
                                            (
                                              <button
                                                onClick={() => {
                                                  updateLastPrintedDate(design._id);
                                                  setUpdate({
                                                    isUpdating: false,
                                                    updatingLocationId: "",
                                                  });
                                                }}
                                                className="inline-flex items-center bg-yellow-700 focus:outline-none rounded hover:bg-yellow-900 px-2 py-1 text-sm font-medium ring-1 ring-inset text-white ring-yellow-500">
                                                Save Print Date
                                              </button>
                                            ) : (
                                              <p>
                                                <DaysDifference givenDate={design.lastPrintedDate} />
                                              </p>
                                            )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div >
          </main >
        </div >
      </div >
    </>
  );
}

export default ScreensLocation;
