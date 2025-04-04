import { useLoaderData, useNavigate } from "react-router-dom";

const AllCrops = () => {
  const crops = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <h2>All Crops</h2>
      <ul>
        {crops.map((crop) => (
          <li key={crop._id}>
            {crop.name} - {crop.units} kg (Farmer: {crop.farmer.username})
            <button onClick={() => navigate(`/dashboard/${crop._id}/buy`)}>
              Buy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCrops;
