import React from "react";
import { Link } from "react-router-dom";
// for now its just login and sign up button
// framer js is needed
// css is needed more content is needed
function Home() {
  return (
    <div>
      <h1>Welcome to the Application</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default Home;
