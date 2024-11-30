import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import { MdPalette, MdRemoveCircleOutline, MdAddCircleOutline } from "react-icons/md";
import { FaBoxes, FaTools, FaTrash } from "react-icons/fa";
import { FiTool, FiSettings } from "react-icons/fi";
import { FaUsers, FaDatabase } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

import axios from "axios";

import DaysDifference from "./DaysDifference";
import { format } from "date-fns";

const teams = [
  { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
  { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
  { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function RemoveLocations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [currentDesigns, setCurrentDesigns] = useState([]);
  const [currentLocations, setCurrentLocations] = useState([]);
  const [userInputDays, setUserInputDays] = useState(100);
  const [removableDesigns, setRemovableDesigns] = useState([]);

  const [update, setUpdate] = useState({
    designLocationValue: "",
    designLocationId: "",
    designStatusValue: "AwaitingEndringRemoving"
  });

  const navigate = useNavigate();

  // Defining navigation names, icons and their routes in the application
  const navigation = [
    { name: "Designs", icon: MdPalette, current: false, route: "/" },
    { name: "Endring Fitting", icon: FiTool, current: false, route: "/EndringFitting" },
    { name: "Add Locations", icon: MdAddCircleOutline, current: false, route: "/AddLocations" },
    { name: "Screen Locations", icon: FaDatabase, current: false, route: "/ScreenLocations" },
    { name: "Remove Locations", icon: MdRemoveCircleOutline, current: true, route: "/RemoveLocations" },
    { name: "Endring Removing", icon: FaTools, current: false, route: "/EndringRemoving" },
    { name: "Endring Removed", icon: FaBoxes, current: false, route: "/EndringRemoved" },
    { name: "Design Details", icon: HiDocumentText, current: false, route: "/" },
    { name: "Employees", icon: FaUsers, current: false, route: "/" },
    { name: "Settings", icon: FiSettings, current: false, route: "/" },
  ];

  const stats = [
    {
      statIdx: 1,
      name: "Removable Designs #",
      value: removableDesigns
        .filter((design => design.designStatus === "InLocation"))
        .length,
    },
    {
      statIdx: 2,
      name: "Removable Screens #",
      value: removableDesigns.
        filter((design => design.designStatus === "InLocation"))
        .reduce((sum, design) => sum + design.numberOfExposedScreens, 0)
    }
  ];

  useEffect(() => {

    const getDesignDetails = async () => {
      try {
        const designDetails = await axios.get(
          `http://localhost:4000/api/designs/search`,
          {
            params: {
              designStatus: ["InLocation", "AwaitingEndringRemoving"]
            },
          }
        );

        setCurrentDesigns(designDetails.data);

      } catch (error) {
        console.error("Error fetching screen details:", error);
      }
    };

    const getLocations = async () => {
      try {
        const locations = await axios.get(`http://localhost:4000/api/locations/`);

        setCurrentLocations(locations.data);
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };

    getDesignDetails();
    getLocations();

    setIsUpdating(false);

  }, [isUpdating]);

  useEffect(() => {
    setRemovableDesigns(currentDesigns
      .filter((design) => {
        const timeDifferenceInMilliseconds = new Date() - new Date(design.lastPrintedDate);
        const daysCount = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
        return Math.floor(daysCount) >= userInputDays;
      }));
  }, [currentDesigns, userInputDays, isUpdating]);

  const removeDesignFromLocation = async (designId, designNumber, designLocation) => {
    try {
      if (window.confirm(`Remove ${designNumber} ?`)) {
        // Getting the locationObjectId for the given designLocation
        const locationId = currentLocations
          .filter((location) => location.locationName == designLocation).map((location) => location._id)[0];

        // Removing the design from the location
        const removeDesign = await axios.patch(`http://localhost:4000/api/locations/removeFromLocation/${locationId}/${designNumber}`);

        // Updating the design
        const updateDesign = await axios.patch(`http://localhost:4000/api/designs/${designId}`, {
          designStatus: "AwaitingEndringRemoving"
        });

        setIsUpdating(true);
      }
    } catch (error) {
      console.error("Error while removing the location", error);
    }
  };

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
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
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
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
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
                {/* <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}
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
                    placeholder="Enter Number Of Days...."
                    type="number"
                    onChange={(event) => setUserInputDays(Number(event.target.value))}
                    defaultValue={userInputDays}
                    min={0} max={1000}
                    name="search"
                  />
                </div>
              </form>
              {/* <button
                type="button"
                className="inline-flex items-center justify-center mt-4 h-1/2 gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                New Design
              </button>
              <button
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
              <div className="grid grid-cols-1 bg-gray-900 sm:grid-cols-2 lg:grid-cols-2">
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
            <div className="border-y border-white/10 bg-gray-900 pt-6 min-h-screen">
              <h2 className="px-4 text-md font-mono leading-7 text-green-400 sm:px-6 lg:px-8">
                Designs Details
              </h2>
              <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                  <col className="w-1/5" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-md leading-6 text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-mono sm:pl-6 lg:pl-8"
                    >
                      Design Number
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-mono sm:table-cell"
                    >
                      Screens #
                    </th>
                    <th
                      scope="col"
                      className="md:hidden py-2 pl-0 pr-8 font-mono sm:table-cell lg:table-cell"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-10 pr-8 font-mono md:table-cell lg:pr-20"
                    >
                      Last Printed Date
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-10 pr-8 font-mono md:table-cell lg:pr-20"
                    >
                      Days
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-mono sm:table-cell sm:pr-4 lg:pr-8"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {removableDesigns &&
                    removableDesigns
                      .map((design) => (
                        <tr key={design._id}>
                          <td className="py-2 pl-4 pr-8 sm:pl-6 lg:pl-8">
                            <div className="flex items-center gap-x-4">
                              <div className={`truncate text-md font-mono leading-6 
                              ${design.designStatus === "InLocation" ?
                                  `text-green-500` : `text-red-500`}`}>
                                {design.designNumber + " / " + design.numberOfColors}
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-2 pl-0 pr-4 sm:table-cell sm:pr-8">
                            <div className="flex gap-x-3">
                              <p className={`truncate text-md font-mono leading-6 
                              ${design.designStatus === "InLocation" ?
                                  `text-green-500` : `text-red-500`}`}>
                                {design.numberOfExposedScreens}
                              </p>
                            </div>
                          </td>
                          <td className="py-2 pl-0 pr-2 sm:table-cell md:hidden lg:table-cell sm:pr-2">
                            <div className="flex gap-x-3">
                              <div className="font-mono text-lg leading-6 text-white">
                                <p className={`truncate text-md font-mono leading-6 
                              ${design.designStatus === "InLocation" ?
                                    `text-green-500` : `text-red-500`}`}>
                                  {design.location}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 pl-10 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                              <div className="font-mono text-lg leading-6 text-white">
                                <p className={`truncate text-md font-mono leading-6 
                              ${design.designStatus === "InLocation" ?
                                    `text-green-500` : `text-red-500`}`}>
                                  {format(design.lastPrintedDate, "PP")}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 pl-10 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                              <div className="font-mono text-lg leading-6 text-white">
                                <p className={`truncate text-md font-mono leading-6 
                              ${design.designStatus === "InLocation" ?
                                    `text-green-500` : `text-red-500`}`}>
                                  <DaysDifference givenDate={design.lastPrintedDate} />
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-2 pl-0 pr-8 text-sm leading-6 text-white md:table-cell md:pr-12 sm:pr-20">
                            <div className="flex items-start justify-start">
                              {design.designStatus === "InLocation" ? (
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-start gap-x-2 rounded-md bg-green-700 px-3 py-2 text-md font-mono text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  onClick={() => {
                                    removeDesignFromLocation(design._id, design.designNumber, design.location);
                                  }}
                                >
                                  Remove
                                  <FaTrash
                                    className="-ml-0.5 h-5 w-5 text-red-900"
                                    aria-hidden="true"
                                  />
                                </button>
                              ) : (
                                <button
                                  disabled
                                  type="button"
                                  className="inline-flex items-center justify-start gap-x-2 rounded-md bg-red-900 px-3 py-2 text-md font-mono text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Remove
                                  <CheckIcon
                                    className="-ml-0.5 h-5 w-5 text-red-300"
                                    aria-hidden="true"
                                  />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default RemoveLocations;
