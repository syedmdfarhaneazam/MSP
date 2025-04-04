import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCrop } from "../actions/cropsActions";
import { useNavigate } from "react-router-dom";

const PostCrop = () => {
  const [formData, setFormData] = useState({
    picture: null,
    name: "",
    expirationDate: "",
    dateOfExtraction: "",
    units: "", // initials
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FormData to send:", formData); //before sending
    dispatch(addCrop(formData)).then(() => navigate("/dashboard/profile"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) =>
          setFormData({ ...formData, picture: e.target.files[0] })
        }
      />
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
      <button type="submit">Post Crop</button>
    </form>
  );
};

export default PostCrop;
