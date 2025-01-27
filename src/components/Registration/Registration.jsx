import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../handler/useAuth";
export default function Registration() {
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (isAuthenticated === true) {
    // Redirect to the previously attempted path or default to '/'
    const redirectPath = location.state?.from || "/attendance";
    navigate(redirectPath);
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegistration = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.log("empty");
      setLoading(false);
      return;
    }
    console.log(name, email, password);
    const res = await axios.post(
      `http://localhost:8000/user/register`,
      { name, email, password },
      { withCredentials: true }
    );
    setLoading(false);
    console.log(res);

    //if error
    if (res?.data?.status_code === 400) {
      console.log("Email already registered");
    }
    //if success
    else if (
      res?.data?.status === "success" &&
      res?.data?.status_code === 200
    ) {
      window.location.reload();
      navigate("/attendance");
    }
  };
  return (
    <div className="container w-96 m-auto mt-32">
      <div className="flex flex-col items-center justify-center dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Join</h2>
          <form className="flex flex-col" onSubmit={handleRegistration}>
            <input
              placeholder="Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              placeholder="Email address"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="flex items-center justify-between flex-wrap">
              <p className="text-white mt-4">
                {" "}
                Already have an account?
                <Link
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                  to="/login"
                >
                  {" "}
                  Login
                </Link>
              </p>
            </div>
            <button
              className={`${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150`}
              type="submit"
            >
              {loading === true ? "Loading" : "Join"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
