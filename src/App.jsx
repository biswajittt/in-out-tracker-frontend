import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import AuthCard from "./components/AuthCard/AuthCard";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const activeCard = useSelector((state) => state.authCard.activeCard);
  console.log(activeCard);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />

      <>
        {activeCard !== null && activeCard !== "undefined" && (
          <AuthCard activeCard={activeCard} />
        )}
      </>
      <Outlet />
    </>
  );
}

export default App;
