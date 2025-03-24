import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authActions";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("BUYER");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // coppied from login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup({ username, password, phone, role, address }));
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="BUYER">Buyer</option>
        <option value="SELLER">Seller</option>
        <option value="ADMIN">Admin</option>
      </select>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
