import { useLoaderData, useNavigate } from "react-router-dom";

const Farmers = () => {
  const farmers = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Farmers</h2>
      <ul>
        {farmers.map((farmer) => (
          <li
            key={farmer._id}
            onClick={() => navigate(`/${farmer._id}/about`)}
            style={{ cursor: "pointer" }}
          >
            {farmer.username} - {farmer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Farmers;
