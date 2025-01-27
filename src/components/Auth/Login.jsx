import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.js";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      setErrorMsg("Please fill the form carefully");
      setLoading(false);
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      alert("Logged in successfully!");
    } catch (err) {
      setError(err.message);
    }
    //   // console.log(email, password);
    //   const res = await axios.post(
    //     `http://localhost:8000/user/login`,
    //     { email, password },
    //     { withCredentials: true }
    //   );
    //   setLoading(false);
    //   // console.log(res);

    //   //if invalid email or pass
    //   if (res?.data?.status_code === 400) {
    //     setError(true);
    //     setErrorMsg("Invalid email or password");
    //     console.log("Invalid email or password");
    //     return;
    //   }
    //   // if success
    //   else if (res?.status === 200) {
    //     setError(false);
    //     window.location.reload();
    //     navigate("/attendance");
    //   }
  };
  return (
    <div className="container w-96 m-auto mt-32">
      {error ? (
        <div className="m-auto text-center text-red-800">{errorMsg}</div>
      ) : null}
      <div className="flex flex-col items-center justify-center dark mt-8">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Login</h2>
          <form className="flex flex-col" onSubmit={handleLogin}>
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
                Don't have an account?
                <Link
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                  to="/registration"
                >
                  {" "}
                  Join
                </Link>
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
