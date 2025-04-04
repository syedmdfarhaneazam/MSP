import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const BuyCrop = () => {
  const crop = useLoaderData();
  const navigate = useNavigate();
  const [units, setUnits] = useState("");

  const handleBuy = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_URL}/crops/${crop._id}/buy`,
      { units: Number(units) },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    navigate("/dashboard/all-crops");
  };

  return (
    <div>
      <h2>Buy Crop: {crop.name}</h2>
      <p>Available Units: {crop.unitsInStock} kg</p>
      <form onSubmit={handleBuy}>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Units to buy"
          max={crop.unitsInStock}
        />
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

export default BuyCrop;
