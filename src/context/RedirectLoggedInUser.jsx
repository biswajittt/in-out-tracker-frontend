import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx"; // Import your useAuth hook

const RedirectLoggedInUser = ({ children }) => {
  const { currentUser } = useAuth(); // Get currentUser from context
  const location = useLocation(); // Get current location

  // Redirect user to the page they came from (location.state) or a default page (e.g., '/dashboard') if logged in
  if (currentUser) {
    return <Navigate to={location.state?.from || "/dashboard"} replace />;
  }

  return children; // If user is not logged in, render the children (login or registration form)
};

export default RedirectLoggedInUser;
