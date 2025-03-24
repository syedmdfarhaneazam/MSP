import React from "react";
// for nav bar outlet
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authActions";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    // deleting the toeoken
  };
  // gonna use NavLink later intead of link to now if the lin is acitve for the css classing
  return (
    <div>
      <nav>
        <Link to="/dashboard/farmers">Farmers</Link>
        <Link to="/dashboard/buyers">Buyers</Link>
        <Link to="/dashboard/all-crops">All Crops</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/contact-us">Contact Us</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Welcome , {user.username}</h1>
      <Outlet />
    </div>
  );
}

export default Dashboard;
