import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggle = () => setShowMenu(!showMenu);

  return (
    <>
      <header className="p-4 sticky top-0 bg-gray-700 shadow-md z-50">
        <nav className="navbar flex items-center justify-between">
          <div className="navbar-brand text-2xl font-extrabold text-white">
            <h2>InOut Tracker</h2>
          </div>

          <div className="nav-items hidden lg:flex flex-grow justify-center font-bold">
            <ul className="flex gap-10">
              <li className="cursor-pointer">
                <Link to={'/user/login'} className="text-white hover:text-sky-400">Login</Link>
              </li>
              <li className="cursor-pointer">
                <Link to={'/user/register'} className="text-white hover:text-sky-400">Register</Link>
              </li>
              <li className="cursor-pointer">
                <Link to={'/calender'} className="text-white hover:text-sky-400">Calendar</Link>
              </li>
            </ul>
          </div>

          <div className="nav-btn font-bold hidden lg:flex">
            <button className="bg-sky-600 rounded-2xl p-2 px-4 text-white cursor-pointer hover:bg-sky-700">
              Logout
            </button>
          </div>

          <div className="ham-btn lg:hidden">
            <button onClick={handleToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-align-justify text-white"
              >
                <path d="M3 12h18" />
                <path d="M3 18h18" />
                <path d="M3 6h18" />
              </svg>
            </button>
          </div>
        </nav>


        <div
          className={`lg:hidden fixed top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 transition-transform duration-300 ease-in-out ${
            showMenu ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 text-center font-bold p-4">
            <li><Link to={'/user/login'} className="text-gray-800 hover:text-sky-600">Login</Link></li>
            <li><Link to={'/user/register'} className="text-gray-800 hover:text-sky-600">Register</Link></li>
            <li><Link to={'/calender'} className="text-gray-800 hover:text-sky-600">Calender</Link></li>
            <li>
              <button className="bg-sky-600 w-full rounded-2xl p-2 px-4 text-white cursor-pointer hover:bg-sky-700">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
