import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./handler/useAuth.js";
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Return a loading spinner or nothing while checking authentication
    return <div>Loading...</div>; // You can customize this part
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Only render children if authenticated
};

export default ProtectedRoute;
