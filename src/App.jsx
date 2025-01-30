import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import Herosection from "./components/Admin Dashboard/Hero Section/Herosection";
import AdminDashboard from "./components/Admin Dashboard/AdminDashboard";

function App() {
  const activeCard = useSelector((state) => state.authCard.activeCard);
  console.log(activeCard);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />

      <Outlet />

    </>
  );
}

export default App;
