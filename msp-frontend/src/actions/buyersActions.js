import axios from "axios";
import { API_URL } from "../config";

export const fetchBuyers = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/users/buyers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "FETCH_BUYERS", payload: res.data });
};
