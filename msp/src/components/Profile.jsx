import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCrops, addCrop, deleteCrop } from "../redux/cropsActions";
import { fetchMyPurchases } from "../redux/purchasesActions";
import { updateUser } from "../redux/authActions";
// too many usestate for update and delete
function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const myCrops = useSelector((state) => state.crops.myCrops);
  const myPurchases = useSelector((state) => state.purchases.myPurchases);
  // very buly component
  const [newCropName, setNewCropName] = useState("");
  const [newCropMonth, setNewCropMonth] = useState("");
  const [newCropUnits, setNewCropUnits] = useState("");
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);

  useEffect(() => {
    if (role === "SELLER") dispatch(fetchMyCrops());
    else if (role === "BUYER") dispatch(fetchMyPurchases());
    // deafaults
  }, [dispatch, role]);

  const handleAddCrop = (e) => {
    e.preventDefault();
    dispatch(
      addCrop({
        name: newCropName,
        monthOfProduction: newCropMonth,
        unitsInStock: newCropUnits,
      }),
    );
    setNewCropName("");
    setNewCropMonth("");
    setNewCropUnits("");
  };

  const handleDeleteCrop = (id) => dispatch(deleteCrop(id));

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ username, phone, address }),
    });
    if (response.ok) dispatch(updateUser(await response.json()));
  };
  // works
  return (
    <div>
      <h2>Profile</h2>
      {role === "SELLER" && (
        <>
          <h3>Add New Crop</h3>
          <form onSubmit={handleAddCrop}>
            <input
              value={newCropName}
              onChange={(e) => setNewCropName(e.target.value)}
              placeholder="Crop Name"
            />
            <input
              type="date"
              value={newCropMonth}
              onChange={(e) => setNewCropMonth(e.target.value)}
            />
            <input
              type="number"
              value={newCropUnits}
              onChange={(e) => setNewCropUnits(e.target.value)}
              placeholder="Units"
            />
            <button type="submit">Add</button>
          </form>
          <h3>My Crops</h3>
          <ul>
            {myCrops.map((crop) => (
              <li key={crop._id}>
                {crop.name} - {crop.unitsInStock} units
                <button onClick={() => handleDeleteCrop(crop._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {role === "BUYER" && (
        <>
          <h3>Recent Purchases</h3>
          <ul>
            {myPurchases.map((purchase) => (
              <li key={purchase._id}>
                {purchase.crop.name} - {purchase.units} units
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>Update Profile</h3>
      <form onSubmit={handleUpdateProfile}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Profile;
