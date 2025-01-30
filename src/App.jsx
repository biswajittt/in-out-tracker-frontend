import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // ✅ Import added
import { Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";


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
