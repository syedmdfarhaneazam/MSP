import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCrop } from "../actions/cropsActions.js";
import { updateUser, loadUser } from "../actions/authActions.js";
import { useNavigate, useLoaderData } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const user = authState.user;
  const myCrops = useLoaderData();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    } else {
      setFormData({
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [dispatch, user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.id, formData));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone || "Not set"}
        </p>
        <p>
          <strong>Address:</strong> {user.address || "Not set"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      <h3>Update Profile</h3>
      <form onSubmit={handleUpdate}>
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Username"
        />
        <input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Address"
        />
        <button type="submit">Update</button>
      </form>
      {user.role === "SELLER" && (
        <>
          <button onClick={() => navigate("/dashboard/postCrop")}>
            Post New Crop
          </button>
          <h3>My Crops</h3>
          <ul>
            {myCrops.map((crop) => (
              <li key={crop._id}>
                {crop.name} - {crop.units} kg
                <button onClick={() => navigate(`/dashboard/${crop._id}/edit`)}>
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/dashboard/${crop._id}/delete`)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
