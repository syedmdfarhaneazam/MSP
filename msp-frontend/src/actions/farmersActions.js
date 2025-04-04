import axios from "axios";
import { API_URL } from "../config";

export const fetchFarmers = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/users/farmers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "FETCH_FARMERS", payload: res.data });
};
