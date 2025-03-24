import { useDispatch, useSelector } from "react-redux";
import { fetchAllCrops } from "../redux/cropsActions";
import { useEffect } from "react";
// alllll crops displayed
// buy funciton ality will be added later
// mailler jas will be implemented later
function AllCrops() {
  const dispatch = useDispatch();
  const crops = useSelector((state) => state.crops.allCrops);
  // not optimsed pagination neede but jo he so he
  useEffect(() => {
    dispatch(fetchAllCrops());
  }, [dispatch]);
  // dependency is displtch which is incorrect
  // maping all the crops here
  return (
    <div>
      <h2>All Crops</h2>
      <ul>
        {crops.map((crop) => (
          <li key={crop._id}>
            {crop.name} - {crop.unitsInStock} units
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCrops;
