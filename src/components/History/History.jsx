import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
export default function History() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const fetchUserHistory = async () => {
    const idToken = await currentUser.getIdToken();
    const res = await axios.post(
      "http://localhost:8000/user/history",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`, // Pass the Firebase ID token in Authorization header
        },
      }
    );
    // console.log(res);

    if (res?.data?.status_code === 200 && res?.data?.success === true) {
      setHistory(res.data.data);
      // console.log(history);
    }
  };
  useEffect(() => {
    fetchUserHistory();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 m-auto mt-32">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                In Time
              </th>
              <th scope="col" className="px-6 py-3">
                Out Time
              </th>
              <th scope="col" className="px-6 py-3">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {new Date(data.activity_date).toISOString().split("T")[0]}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(data.checkin_time).toTimeString().split(" ")[0]}
                  </td>
                  <td className="px-6 py-4">
                    {data.checkedOut === false
                      ? "-"
                      : new Date(data.checkout_time)
                          .toTimeString()
                          .split(" ")[0]}
                  </td>
                  <td className="px-6 py-4">{data.isActive ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white dark:bg-gray-800">
                <td
                  colSpan="4"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  No history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
  // return (
  //   <div className="w-3/4  m-auto mt-8">
  //     <div className="container mt-16 bg-slate-800 rounded-md h-52 p-4">
  //       <div className="container ">
  //         <div className="flex justify-evenly border-b-4 border-indigo-50">
  //           <div>Date</div>
  //           <div>In Time</div>
  //           <div>Out Time</div>
  //         </div>
  //         <div className="flex justify-evenly mt-2">
  //           <div>23.66</div>
  //           <div>10pm</div>
  //           <div>5454</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
