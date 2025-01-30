import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
// import Registration from "./components/Registration/Registration.jsx";
// import Login from "./components/Login/Login.jsx";
import History from "./components/History/History.jsx";
// import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";
import NotFound from "./components/Notfound/NotFound.jsx";
import Login from "./components/Auth/Login.jsx";
import Registration from "./components/Auth/Registration.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import RedirectLoggedInUser from "./context/RedirectLoggedInUser.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
// import Login from "./components/Admin/Login/Login.jsx";
// import Registration from "./components/Admin/Registration/Registration.jsx";
import OrgLogin from "./components/Admin/Login/Login.jsx";
import OrgRegistration from "./components/Admin/Registration/Registration.jsx";
import AddEmployee from "./components/Admin/AdminDashboard/Sections/AddEmployee.jsx";
import WorkingEmployees from "./components/Admin/AdminDashboard/Sections/WorkingEmployees.jsx";
// Restrict access to pages for unauthenticated users
const ProtectedRoute = () => {
  const { currentUser } = useAuth(); // Access the authentication context

  // If `currentUser` is null or undefined, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      {/* Wrap Login and Registration with RedirectLoggedInUser */}
      <Route
        path="/login"
        element={
          <RedirectLoggedInUser>
            <Login />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path="/registration"
        element={
          <RedirectLoggedInUser>
            <Registration />
          </RedirectLoggedInUser>
        }
      />
      {/* Wrap Org Login and Registration with RedirectLoggedInUser */}
      <Route
        path="org/login"
        element={
          <RedirectLoggedInUser>
            <OrgLogin />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path="org/registration"
        element={
          <RedirectLoggedInUser>
            <OrgRegistration />
          </RedirectLoggedInUser>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* Admin dashboard */}
      <Route path="admin/dashboard/" element={<AdminDashboard />}>
        <Route path="" element={<AddEmployee />} />
        <Route path="active-employees" element={<WorkingEmployees />} />
      </Route>
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
);
