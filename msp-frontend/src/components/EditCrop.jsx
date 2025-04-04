import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const EditCrop = () => {
  const crop = useLoaderData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: crop.name,
    expirationDate: crop.expirationDate.split("T")[0],
    dateOfExtraction: crop.dateOfExtraction.split("T")[0],
    units: crop.units,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`${API_URL}/crops/${crop._id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/dashboard/profile");
  };

  return (
    <div>
      <h2>Edit Crop</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Crop Name"
        />
        <input
          type="date"
          value={formData.expirationDate}
          onChange={(e) =>
            setFormData({ ...formData, expirationDate: e.target.value })
          }
        />
        <input
          type="date"
          value={formData.dateOfExtraction}
          onChange={(e) =>
            setFormData({ ...formData, dateOfExtraction: e.target.value })
          }
        />
        <input
          type="number"
          value={formData.units}
          onChange={(e) => setFormData({ ...formData, units: e.target.value })}
          placeholder="Units (kg)"
        />
        <button type="submit">Update Crop</button>
      </form>
    </div>
  );
};

export default EditCrop;
