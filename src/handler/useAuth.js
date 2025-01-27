import { useState, useEffect } from "react";
import axios from "axios";
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with `null` for loading state
  const [user, setUser] = useState(null); // To store user data
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/auth-status",
          {},
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
        // If the user is authenticated, set true
        if (response?.data?.user) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Store user data in state
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false); // On error, assume not authenticated
      }
    };

    checkAuthentication();
  }, []);

  return { isAuthenticated, setIsAuthenticated, user }; // Return `isAuthenticated ->  // Returns `true`, `false`, or `null` (loading)` and `user` data
};

export default useAuth;
