import { useDispatch, useSelector } from "react-redux";
// new fucniot to fetch buyers
import { fetchBuyers } from "../redux/buyersActions";
import { useEffect } from "react";

function Buyers() {
  const dispatch = useDispatch();
  const buyers = useSelector((state) => state.buyers.buyers);

  useEffect(() => {
    dispatch(fetchBuyers());
  }, [dispatch]);
  // maping all buyers pagination needed
  return (
    <div>
      <h2>Buyers</h2>
      <ul>
        {buyers.map((buyer) => (
          <li key={buyer._id}>
            {buyer.username} - {buyer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buyers;
