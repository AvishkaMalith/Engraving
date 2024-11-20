import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";

import { MdPalette, MdRemoveCircleOutline } from "react-icons/md";
import { FiTool, FiSettings } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaUsers, FaDatabase } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [awaitingEngravingDesigns, setAwaitingEngrvingDesigns] = useState([]);
  const [numberOfNewDesigns, setNumberOfNewDesigns] = useState(0);
  const [numberOfNewScreens, setNumberOfNewScreens] = useState(0);
  const [numberOfReExposeScreens, setNumberOfReExposeScreens] = useState(0);

  const navigate = useNavigate();

  const navigation = [
    { name: "Designs", icon: MdPalette, current: true, route: "/" },
    { name: "Endring Fittings", icon: FiTool, current: false, route: "/ScreensEndringFitting" },
    { name: "Screen Locations", icon: GoLocation, current: false, route: "/ScreensLocation" },
    { name: "Screen Warehouse", icon: FaDatabase, current: false, route: "/ScreenWarehouse" },
    { name: "Endring Removing", icon: MdRemoveCircleOutline, current: false, route: "/ScreenWarehouse" },
    { name: "Design Details", icon: HiDocumentText, current: false, route: "/" },
    { name: "Employees", icon: FaUsers, current: false, route: "/" },
    { name: "Settings", icon: FiSettings, current: false, route: "/" },
  ];

  const stats = [
    { name: "New Designs", value: numberOfNewDesigns },
    { name: "New Screens", value: numberOfNewScreens },
    { name: "Re-Expose Screens", value: numberOfReExposeScreens },
    { name: "Total Screens", value: numberOfNewScreens + numberOfReExposeScreens }
  ];

  useEffect(() => {

    const getAwaitingEngravingDesigns = async () => {
      try {
        // Fetch only designs with "AwaitingEngraving" status
        const designResults = await axios.get(
          "http://localhost:4000/api/designs/search",
          {
            params: { designStatus: ["AwaitingEngraving", "BeingEngraved"] }
          }
        );

        setAwaitingEngrvingDesigns(designResults.data);
        setNumberOfNewDesigns(designResults.data.length);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    const getAwaitingEngravingScreens = async () => {
      try {
        // Fetch only designs with "AwaitingEngraving" status
        const screenResults = await axios.get(
          "http://localhost:4000/api/screens/search", {
          params: {
            screenStatus: "AwaitingEngraving"
          }
        }
        );

        setNumberOfNewScreens(screenResults.data.length);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getAwaitingEngravingScreens();
    getAwaitingEngravingDesigns();

  }, []);

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
                    type="search"
                    name="search"
                  />
                </div>
              </form>
              <button
                type="button"
                onClick={() => navigate("/DesignDetailsInput")}
                className="inline-flex items-center justify-center mt-4 h-1/2 gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                New Design
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center mt-4 h-1/2 gap-x-1.5 rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Re-Expose
              </button>
            </div>
          </div>

          <main>
            <header>
              {/* Secondary navigation */}
              {/* <nav className="flex overflow-x-auto border-b border-white/10 py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={item.current ? "text-indigo-400" : ""}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav> */}

              {/* Heading */}
              {/* <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-900 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h1 className="flex gap-x-3 text-base leading-7">
                      <span className="font-semibold text-white">
                        Planetaria
                      </span>
                      <span className="text-gray-600">/</span>
                      <span className="font-semibold text-white">
                        mobile-api
                      </span>
                    </h1>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-gray-400">
                    Deploys from GitHub via main branch
                  </p>
                </div>
                <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
                  Production
                </div>
              </div> */}

              {/* Stats */}
              <div className="grid grid-cols-1 bg-gray-900 sm:grid-cols-2 lg:grid-cols-4">
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
                Latest Designs
              </h2>
              <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                  <col className="w-1/7 sm:w-2/12" />
                  <col className="lg:w-1/7" />
                  <col className="lg:w-1/7" />
                  <col className="lg:w-1/7" />
                  <col className="lg:w-1/7" />
                  <col className="lg:w-1/7" />
                  <col className="lg:w-1/7" />
                </colgroup>
                <thead className="border-b border-white/10 md:text-sm lg:text-md leading-6 text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-mono sm:pl-6 lg:pl-8"
                    >
                      Design Number
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-mono sm:table-cell "
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="md:hidden py-2 pl-4 pr-8 font-mono sm:table-cell lg:table-cell"
                    >
                      Screens #
                    </th>
                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-mono sm:pr-8 sm:text-left lg:pr-20"
                    >
                      Received Date
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-mono md:table-cell lg:pr-20"
                    >
                      Design Name
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-mono md:table-cell lg:pr-20"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-mono sm:table-cell sm:pr-6 lg:pr-8"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {awaitingEngravingDesigns &&
                    awaitingEngravingDesigns.map((design) => (
                      <tr key={design._id}>
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                          <div className="flex items-center gap-x-4">
                            {/* <img
                            src={design.user.imageUrl}
                            alt=""
                            className="h-8 w-8 rounded-full bg-gray-800"
                          /> */}
                            <div className="truncate text-lg font-mono leading-6 text-white">
                              {design.designNumber + " / " + design.numberOfColors}
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 md:pr-5">
                          <div className="flex gap-x-3">
                            {design.exposedStatus === "New" ? (
                              <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-sm font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                                {design.exposedStatus}
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-sm font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                                {design.exposedStatus}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 pl-4 pr-4 sm:table-cell md:hidden lg:table-cell sm:pr-8">
                          <div className="flex gap-x-3">
                            <div className="font-mono text-lg leading-6 text-white">
                              {design.numberOfColors}
                            </div>
                            {/* <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                            {design.numberOfExposedScreens}
                          </span> */}
                          </div>
                        </td>
                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                          <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                            {/* <time
                            className="text-gray-400 sm:hidden"
                            dateTime={design.receivedDate}
                          >
                            {design.receivedDate}
                          </time>
                          <div
                            className={classNames(
                              statuses[design.status],
                              "flex-none rounded-full p-1"
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div> */}
                            <div className="font-mono text-lg leading-6 text-white">
                              {design.receivedDate}
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-lg leading-6 font-mono text-white md:table-cell lg:pr-10">
                          {design.designName}
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-lg leading-6 font-mono text-white md:table-cell lg:pr-10">
                          {design.customer}
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell md:pr-12 sm:pr-20">
                          <div className="flex items-start justify-start">
                            <button
                              type="button"
                              className={`${design.designStatus === `AwaitingEngraving` ? (`focus-visible:outline-indigo-600 text-white bg-indigo-600 hover:bg-indigo-500`)
                                : (`focus-visible:outline-orange-600 text-indigo-900 bg-yellow-500 hover:bg-yellow-600`)
                                }
                                inline-flex items-center justify-start gap-x-2 rounded-md  px-3 py-2 text-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                              onClick={() => navigate(`/DesignsEngraving`, { state: { design } })}
                            >
                              {design.designStatus === `AwaitingEngraving` ? "Start Engraving" : "Continue Engraving"}
                              <ArrowRightCircleIcon
                                className="-ml-0.5 h-5 w-5 text-green-500"
                                aria-hidden="true"
                              />
                            </button>
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

export default Dashboard;
