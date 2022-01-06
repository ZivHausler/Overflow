import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, SunIcon, MoonIcon } from "@heroicons/react/solid";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import useDarkMode from "../../hooks/useDarkMode";
import LoginButton from "../../general-components/LoginButton";
import LogoutButton from "../../general-components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import ReactTooltip from "react-tooltip";
import { getAllUserCourses } from "../../API/usersApi";
import { getAllCourses } from "../../API/courseApi";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Nav = ({ isListUpdated }) => {
  const colors = ["yellow", "pink", "gray", "red", "blue", "green", "indigo"];

  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const { user, isLoading } = useAuth0();
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  // fetch all user courses and general courses
  useEffect(() => {
    (async () => {
      try {
        if (!isLoading) {
          if (user) {
            const crsList = getAllCourses();
            const ucList = getAllUserCourses();
            Promise.all([crsList, ucList]).then((values) => {
              setCourses(values[0].data.data.allCourses.nodes);
              setUserCourses(
                values[1].data.data.allUserCourses.nodes.filter(
                  (course) => course.uid === user.sub.split("|")[1]
                )
              );
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllUserCourses();
        if (!isLoading)
          setUserCourses(
            response.data.data.allUserCourses.nodes.filter(
              (course) => course.uid === user.sub.split("|")[1]
            )
          );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isListUpdated]);

  // create a list of course that the user liked
  const createList = () => {
    let list = [];
    userCourses.forEach((course) => {
      if (course.uid === user.sub.split("|")[1]) list.push(course);
    });
    return list;
  };

  // render the user courses to the relevant place
  const renderUserCourses = () => {
    return createList(userCourses, "userCourse").map((item, index) =>
      courses.map((course) => {
        if (item.cid === course.id) {
          return (
            <a
              key={index}
              href={"/course=" + course.id}
              className={`-m-3 px-4 py-2 flex items-start rounded-lg dark:hover:bg-gray-700 hover:bg-${
                colors[index % colors.length]
              }-50`}
            >
              <div className="ml-4">
                <p className="text-sm ml-4 text-gray-500">[{course.id}]</p>
                <p className="text-normal font-medium dark:text-white text-gray-900">
                  {course.name}
                </p>
              </div>
            </a>
          );
        }
      })
    );
  };

  return (
    <Popover className="bg-white sticky top-0 z-10 dark:bg-black dark:text-white">
      <div className=" mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center border-b-2 dark:border-gray-600 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start items-center lg:w-0 lg:flex-1">
            <span className="sr-only">תרשים זרימה</span>
            <a href="/">
              <p className="text-3xl text-indigo-600 font-bold">Overflow</p>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">פתח תפריט</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  {createList(userCourses, "useCours").length > 0 && (
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  dark:bg-black dark:hover:text-gray-400 dark:text-white"
                      )}
                    >
                      <span>הקורסים שלי</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500 dark:hover:text-gray-400 dark:text-white"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  )}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div
                        dir="rtl"
                        className="rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                      >
                        <div className="relative dark:bg-gray-900 grid gap-6 z-15 bg-white px-2 py-3 sm:gap-6 sm:p-6">
                          {renderUserCourses()}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <div
                    data-tip
                    data-for="MainDarkModeTip"
                    className="w-10 flex justify-center"
                  >
                    {isDarkMode && (
                      <MoonIcon
                        onClick={() => setIsDarkMode(false)}
                        className="h-6 w-6 text-indigo-700 cursor-pointer"
                        aria-hidden="true"
                      />
                    )}
                    {!isDarkMode && (
                      <SunIcon
                        onClick={() => setIsDarkMode(true)}
                        className="h-6 w-6 text-yellow-500 cursor-pointer"
                        aria-hidden="true"
                      />
                    )}
                    <ReactTooltip
                      id="MainDarkModeTip"
                      className="text-center"
                      place="bottom"
                      effect="solid"
                    >
                      החלף בין<br></br>מצב לילה ליום
                    </ReactTooltip>
                  </div>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-center md:flex-1 lg:w-0 ">
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {!user && <LoginButton />}
              {user && (
                <div className="flex items-center">
                  <LogoutButton />
                  <div className="ml-5 mr-1">
                    <div className="flex items-center">
                      <img
                        data-tip
                        data-for="registerTip"
                        src={user.picture}
                        className="h-12 w-12 rounded-full shadow-lg"
                      />
                      <ReactTooltip
                        id="registerTip"
                        className="text-center"
                        place="bottom"
                        effect="solid"
                      >
                        {user.given_name}
                        <br></br>
                        {user.family_name}
                      </ReactTooltip>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className=" absolute   top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden "
        >
          <div className="rounded-lg dark:bg-gray-900  shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 dark:text-white">
              <div className="flex items-center justify-between">
                <div>
                  <a href="/">
                    <img
                      className="h-10 w-auto"
                      src="https://i.imgur.com/S6Ifa8K.png"
                      alt="Workflow"
                    />
                  </a>
                </div>
                <div
                  data-tip
                  data-for="DarkModeTip"
                  className="w-10 flex justify-center"
                >
                  {isDarkMode && (
                    <MoonIcon
                      onClick={() => setIsDarkMode(false)}
                      className="h-6 w-6 text-indigo-700 cursor-pointer"
                      aria-hidden="true"
                    />
                  )}
                  {!isDarkMode && (
                    <SunIcon
                      onClick={() => setIsDarkMode(true)}
                      className="h-6 w-6 text-yellow-500 cursor-pointer"
                      aria-hidden="true"
                    />
                  )}
                  <ReactTooltip
                    id="DarkModeTip"
                    className="text-center"
                    place="bottom"
                    effect="solid"
                  >
                    החלף בין<br></br>מצב לילה ליום
                  </ReactTooltip>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white  rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only ">סגור תפריט</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div dir="rtl" className="mt-4">
                <nav className="grid gap-y-6">{renderUserCourses()}</nav>
              </div>
            </div>
            <div dir="rtl" className="py-6 px-5 text-center space-y-6 ">
              <div>
                {!user && <LoginButton />}
                {user && <LogoutButton />}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default Nav;
