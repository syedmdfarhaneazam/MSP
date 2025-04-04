import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cropsReducer from "./cropsReducer";
import farmersReducer from "./farmersReducer";
import buyersReducer from "./buyersReducer";

export default combineReducers({
  auth: authReducer,
  crops: cropsReducer,
  farmers: farmersReducer,
  buyers: buyersReducer,
});
