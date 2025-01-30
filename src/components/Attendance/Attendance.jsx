import { useState, useEffect } from "react";
import Clock from "../../../public/clock.png";
import checkInHandler from "../../handler/handleCheckIn";
import { useNavigate } from "react-router-dom";
import checkOutHandler from "../../handler/handleCheckOut";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function Attendance() {
  const navigate = useNavigate();
  //checking user is authenticated or not
  const { currentUser } = useAuth();
  const user = currentUser?.user;
  // console.log(user);
  const isAuthenticated = true;
  //state variables
  const [date, setDate] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(null);
  const [checkedOut, setCheckedOut] = useState(null);

  const [done, setDone] = useState(false);
  const [doneMsg, setDoneMsg] = useState("");

  function convertToCustomDateTime(timestamp) {
    // Parse the input timestamp into a Date object
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date)) {
      return "Invalid Date";
    }

    // Extract day, month, year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    // Extract hours, minutes, seconds and convert to 12-hour format
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    hours = String(hours).padStart(2, "0");

    // Return formatted date and time
    return `${day}:${month}:${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }

  //on check in
  const handleCheckIn = async () => {
    console.log(checkedIn, checkedOut);
    if (isAuthenticated === false) {
      navigate("/login");
      console.log("you are not login");
      return;
    }
    //get token from firebase
    const idToken = await currentUser.getIdToken();
    const res = await checkInHandler(idToken);
    //successfully checkedin
    if (res?.status_code === 200) {
      // console.log("hi", res);
      setCheckedIn(true);
      setCheckedOut(false);
      await checkStatus();

      //Broadcast data to admin
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
    const idToken = await currentUser.getIdToken();
    const res = await checkOutHandler(idToken);
    //successfully checkedout
    if (res?.status_code === 200) {
      await checkStatus();
    }
  };

  //check in or chekout status
  const checkStatus = async () => {
    const idToken = await currentUser.getIdToken();
    // console.log(idToken);
    const res = await axios.post(
      "http://localhost:8000/user/status",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`, // Pass the Firebase ID token in Authorization header
        },
      }
    );
    // console.log(res?.data);
    //user not loggedin
    if (res?.data?.status_code === 401) {
      console.log("user not loggedin");
      setCheckedIn(null);
      setCheckedOut(null);
      return;
    }
    //user not yet check in
    else if (
      res?.data?.status_code === 404 &&
      res?.data?.attendanceStatus === "not_checked_in"
    ) {
      // console.log("User Checked in...");
      setCheckedIn(false);
      setCheckedOut(false);
      return;
    }
    //user  checked in
    else if (
      res?.data?.status_code === 200 &&
      res?.data?.attendanceStatus === "checked_in"
    ) {
      console.log("User Checked in...");
      setCheckedIn(true);
      setCheckedOut(false);
      return;
    }
    //user  checked out
    else if (
      res?.data?.status_code === 200 &&
      res?.data?.attendanceStatus === "completed"
    ) {
      console.log("User Checked out...");
      setCheckedIn(true);
      setCheckedOut(true);
      setDone(true);
      setDoneMsg("You have already completed check in and check out for today");
      return;
    }
    // //already have cheked in and cheked out
    // else if (
    //   res?.data?.status_code === 200 &&
    //   res?.data?.status === "completed"
    // ) {
    //   setCheckedIn(true);
    //   setCheckedOut(true);
    //   setDone(true);
    //   setDoneMsg("You have already completed check in and check out for today");
    //   return;
    // }
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
    <>
      {/* <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      /> */}
      <div className="w-2/4  m-auto mt-32">
        {isAuthenticated ? (
          <div className="container p-2 bg-slate-800 rounded-md">
            <div className="flex flex-row items-center">
              <div className="basis-1/4">
                <div className="size-8 rounded-full ring-2 ring-white bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {`${currentUser?.email?.match(/[a-zA-Z]/)[0]}`}
                </div>
              </div>
              <div className="basis-3/4 justify-items-start pl-2 pt-1 pb-1">
                <p className="font-sans font-bold">{user?.name}</p>
                <p className="font-sans flex items-center">
                  <i
                    className="fa-solid fa-calendar-days mr-2"
                    style={{ color: "grey" }}
                  ></i>
                  <span className="font-bold mr-2">Joined: </span>
                  {convertToCustomDateTime(currentUser?.metadata?.creationTime)}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="container mt-16 bg-slate-800 rounded-md h-52 p-4">
          <div className="flex flex-row">
            <div className="basis-1/2">
              <img alt="clock" src={Clock} className="inline-block w-28 mt-8" />
            </div>
            <div className="basis-1/2 mt-6">
              <p className="font-sans">
                <span className="font-bold mr-2">Date: </span>
                {date.toLocaleDateString()}
              </p>
              <p className="font-sans font-bold mt-6 text-2xl">
                {date.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        {
          <div className="container mt-4 flex justify-center">
            {done === true ? (
              <div className="flex flex-col">
                {doneMsg}
                <button
                  className="rounded-full bg-green-500 w-36 m-auto mt-2"
                  onClick={handleCheckStatus}
                >
                  Check Status
                </button>
              </div>
            ) : (
              <>
                {(checkedIn === null && checkedOut === null) ||
                (checkedIn === false && checkedOut === false) ? (
                  <button
                    className="rounded-full bg-red-500"
                    onClick={handleCheckIn}
                  >
                    Checkin
                  </button>
                ) : checkedIn === true && checkedOut === false ? (
                  <div className="flex justify-around">
                    <button
                      className="rounded-full bg-green-500 mr-2"
                      onClick={handleCheckStatus}
                    >
                      Check Status
                    </button>
                    <button
                      className="rounded-full bg-red-500"
                      onClick={handleCheckOut}
                    >
                      Checkout
                    </button>
                  </div>
                ) : checkedIn === true && checkedOut === true ? (
                  <button
                    className="rounded-full bg-blue-500"
                    onClick={handleCheckStatus}
                  >
                    Check Status
                  </button>
                ) : null}
              </>
            )}
          </div>
        }
      </div>
    </>
  );
}
