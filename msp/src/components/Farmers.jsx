import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmers } from "../redux/farmersActions";
// to duisplay all the farmers
function Farmers() {
  const dispatch = useDispatch();
  const farmers = useSelector((state) => state.farmers.farmers);

  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);
  // not optimed pagination needed
  return (
    <div>
      <h2>Farmers</h2>
      <ul>
        {farmers.map((farmer) => (
          <li key={farmer._id}>
            {farmer.username} - {farmer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Farmers;
