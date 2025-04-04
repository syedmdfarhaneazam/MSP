import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const DeleteCrop = () => {
  const crop = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/crops/${crop._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/dashboard/profile");
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete "{crop.name}"?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/dashboard/profile")}>Cancel</button>
    </div>
  );
};

export default DeleteCrop;
