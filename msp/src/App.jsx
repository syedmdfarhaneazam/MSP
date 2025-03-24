import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Farmers from "./components/Farmers";
import Buyers from "./components/Buyers";
import AllCrops from "./components/AllCrops";
import Profile from "./components/Profile";
import ContactUs from "./components/ContactUs";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route path="farmers" element={<Farmers />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="all-crops" element={<AllCrops />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
