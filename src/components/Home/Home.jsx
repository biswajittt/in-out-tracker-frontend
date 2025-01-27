import React, { useState, useEffect } from "react";
import Clock from "../../../public/clock.png";
import useAuth from "../../handler/useAuth";
import checkInHandler from "../../handler/handleCheckIn";
import { useNavigate, useLocation, Link } from "react-router-dom";
import checkOutHandler from "../../handler/handleCheckOut";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (isAuthenticated === true) {
    // Redirect to the previously attempted path or default to '/'
    const redirectPath = location.state?.from || "/attendance";
    navigate(redirectPath);
  }
  //state variables
  const [date, setDate] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(null);
  const [checkedOut, setCheckedOut] = useState(null);

  const [done, setDone] = useState(false);
  const [doneMsg, setDoneMsg] = useState("");
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  //on check in
  const handleCheckIn = async () => {
    console.log(checkedIn, checkedOut);
    if (isAuthenticated === false) {
      navigate("/login");
      console.log("you are not login");
      return;
    }
    const res = await checkInHandler();
    //successfully checkedin
    if (res?.status_code === 200) {
      // console.log("hi", res);
      setCheckedIn(true);
      setCheckedOut(false);
      await checkStatus();
    }
    // already checked in and out
    else if (res?.status_code === 400 && res?.status === "checked_in") {
      setCheckedIn(true);
      setCheckedOut(false);
    }
    // already checked in and out
    else if (res?.status_code === 400 && res?.status === "completed") {
      setDone(true);
      setDoneMsg("You have already completed check-in and check-out for today");
    }
  };

  //on check in
  const handleCheckOut = async () => {
    if (isAuthenticated === false) {
      navigate("/login");
      console.log("you are not login");
    }
    const res = await checkOutHandler();
    //successfully checkedout
    if (res?.status_code === 200) {
      await checkStatus();
    }
  };

  //check in or chekout status
  const checkStatus = async () => {
    const res = await axios.get("http://localhost:8000/user/status", {
      withCredentials: true,
    });
    //user not loggedin
    if (res?.data?.status_code === 401) {
      console.log("user not loggedin");
      setCheckedIn(null);
      setCheckedOut(null);
      return;
    }
    //user not yet check in
    else if (res?.data?.status_code === 404) {
      // console.log("User Checked in...");
      setCheckedIn(false);
      setCheckedOut(false);
      return;
    }
    //user  checked in
    else if (
      res?.data?.status_code === 200 &&
      res?.data?.status === "checked_in"
    ) {
      console.log("User Checked in...");
      setCheckedIn(true);
      setCheckedOut(false);
      return;
    }
    //user  checked out
    else if (
      res?.data?.status_code === 200 &&
      res?.data?.status === "checked_out"
    ) {
      console.log("User Checked out...");
      setCheckedIn(true);
      setCheckedOut(true);
      return;
    }
    //already have cheked in and cheked out
    else if (
      res?.data?.status_code === 200 &&
      res?.data?.status === "completed"
    ) {
      setCheckedIn(true);
      setCheckedOut(true);
      setDone(true);
      setDoneMsg("You have already completed check in and check out for today");
      return;
    }
  };
  useEffect(() => {
    checkStatus();

    // Update the time every second
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const handleCheckStatus = () => {
    navigate("/history");
  };

  return (
    <div className="w-full mt-32 p-4 text-center bg-white shadow sm:p-8 dark:bg-gray-800 dark:bg-inherit">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Effortless Attendance, Effortless Tracking
      </h5>
      <p className="mt-2 mb-3 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Effortlessly track attendance and boost productivity with our intuitive
        and reliable platform.
      </p>
      <button className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Link to="/registration"> Join Now</Link>
        </span>
      </button>
      <p className="mt-8 mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Stay up to date and move work forward with Attendace Tracker on iOS &
        Android. Download the app today.
      </p>
      <div className=" items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <a
          href="#"
          className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="me-3 w-7 h-7"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="apple"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            ></path>
          </svg>
          <div className="text-left rtl:text-right">
            <div className="mb-1 text-xs">Download on the</div>
            <div className="-mt-1 font-sans text-sm font-semibold">
              Mac App Store
            </div>
          </div>
        </a>
        <a
          href="#"
          className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="me-3 w-7 h-7"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google-play"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
            ></path>
          </svg>
          <div className="text-left rtl:text-right">
            <div className="mb-1 text-xs">Get in on</div>
            <div className="-mt-1 font-sans text-sm font-semibold">
              Google Play
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
