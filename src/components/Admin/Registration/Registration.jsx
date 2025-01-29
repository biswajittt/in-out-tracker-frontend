import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig.js";
export default function OrgRegistration() {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Frontend validation for empty fields
    if (!orgName || !email || !password) {
      alert("All fields are required!");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      // Firebase function to register the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential);
      const user = userCredential.user;

      //on success
      if (user) {
        const idToken = await user.getIdToken();
        const uid = user?.uid;
        //store data on db
        const res = await axios.post(
          `http://localhost:8000/org/registration`,
          { orgName, email, uid },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log(res?.data?.data?.status_code);

        // Clear form or set state as needed
        if (res?.data?.data?.status_code === 200) {
          setLoading(false);
          alert("Registered successfully!");
        }
      }
    } catch (error) {
      setError(true);
      // Firebase error handling
      console.error("Registration error:", error.message);

      // Map Firebase error codes to user-friendly messages
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("This email is already registered.");
          setErrorMsg("This email is already registered");
          break;
        case "auth/invalid-email":
          alert("Invalid email format.");
          setErrorMsg("Invalid email format");
          break;
        case "auth/weak-password":
          alert("Weak password. Please use at least 6 characters.");
          setErrorMsg("Weak password. Please use at least 6 characters");
          break;
        default:
          alert("An error occurred. Please try again.");
          setErrorMsg("An error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container w-96 m-auto mt-32">
      <div className="flex flex-col items-center justify-center dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Join</h2>
          <form className="flex flex-col" onSubmit={handleRegistration}>
            <input
              placeholder="Organization Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              onChange={(e) => {
                setOrgName(e.target.value);
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
