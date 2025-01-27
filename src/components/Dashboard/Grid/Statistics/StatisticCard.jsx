import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
// import useAuth from "../../../../handler/useAuth";

export default function StatisticCard() {
  // const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  // console.log(isAuthenticated);
  const { currentUser } = useAuth(); // Access the authentication context
  const [checkinTimeCount, setCheckinTimeCount] = useState(null);
  const [checkoutTimeCount, setCheckoutTimeCount] = useState(null);
  const [averageTime, setAverageTime] = useState(null);
  const [success, setSuccess] = useState(false);
  const statsHandler = async () => {
    const idToken = await currentUser.getIdToken(); // Firebase ID token
    // console.log(idToken);
    const res = await axios.post(
      "http://localhost:8000/user/user-stats",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`, // Pass the Firebase ID token in Authorization header
        },
      }
    );
    // console.log(res);
    if (res?.status === 200) {
      setSuccess(true);
      setCheckinTimeCount(res.data?.data?.checkin_count);
      setCheckoutTimeCount(res.data?.data?.checkout_count);
      setAverageTime(res.data?.data?.average_waiting_time);
      // console.log(res.data.checkin_count);
    }
  };
  useEffect(() => {
    statsHandler();
  }, []);
  return (
    <div className="flex items-start justify-center text-gray-800 p-10 bg-gray-200 mt-12 mb-12">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
            <svg
              className="w-6 h-6 fill-current text-green-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">
              {success ? checkinTimeCount : "N/A"}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">No of Checkin</span>
              <span className="text-green-500 text-sm font-semibold ml-2">
                +12.6%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
            <svg
              className="w-6 h-6 fill-current text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">
              {success ? averageTime : "N/A"}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Average Waiting Time</span>
              <span className="text-red-500 text-sm font-semibold ml-2">
                -8.1%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
            <svg
              className="w-6 h-6 fill-current text-green-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">
              {success ? checkoutTimeCount : "N/A"}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">No of Checkout</span>
              <span className="text-green-500 text-sm font-semibold ml-2">
                +28.4%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
