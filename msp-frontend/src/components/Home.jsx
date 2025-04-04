import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MSP Platform</h1>
      <p>Connecting farmers and buyers seamlessly</p>
      <div className="button-group">
        <Link to="/login" className="btn btn-login">
          Login
        </Link>
        <Link to="/signup" className="btn btn-signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
