import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";

import AdminDashboard from "./components/Admin Dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />

    </>
  );
}

export default App;
