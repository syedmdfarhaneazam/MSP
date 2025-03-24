import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./redux/authReducer";
import farmersReducer from "./redux/farmersReducer";
import buyersReducer from "./redux/buyersReducer";
import cropsReducer from "./redux/cropsReducer";
import purchasesReducer from "./redux/purchasesReducer";
// optimised
const rootReducer = combineReducers({
  auth: authReducer,
  farmers: farmersReducer,
  buyers: buyersReducer,
  crops: cropsReducer,
  purchases: purchasesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
