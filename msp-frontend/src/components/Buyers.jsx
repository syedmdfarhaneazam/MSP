import { useLoaderData, useNavigate } from "react-router-dom";

const Buyers = () => {
  const buyers = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Buyers</h2>
      <ul>
        {buyers.map((buyer) => (
          <li
            key={buyer._id}
            onClick={() => navigate(`/${buyer._id}/about`)}
            style={{ cursor: "pointer" }}
          >
            {buyer.username} - {buyer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buyers;
