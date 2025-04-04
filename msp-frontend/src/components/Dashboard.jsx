import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
// using outlet can define a different component for the nac and outlet
// in the css make this flex and fixeddddd to the top
const Dashboard = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user || {});

  return (
    <div>
      <nav>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/postCrop">Post Crop</Link>
        <Link to="/dashboard/all-crops">All Crops</Link>
        <Link to="/dashboard/farmers">Farmers</Link>
        <Link to="/dashboard/buyers">Buyers</Link>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
