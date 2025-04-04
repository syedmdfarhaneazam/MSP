import axios from "axios";
import { API_URL } from "../config";

export const addCrop = (cropData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  Object.keys(cropData).forEach((key) => formData.append(key, cropData[key]));
  console.log("Sending crop data:", cropData, "Token:", token); // how it looks before request
  try {
    const res = await axios.post(`${API_URL}/crops`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "ADD_CROP", payload: res.data });
  } catch (err) {
    console.error("Error posting crop:", err.response?.data || err.message);
    throw err; // handdled
  }
};
// get all crops
export const fetchAllCrops = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/crops`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "FETCH_ALL_CROPS", payload: res.data });
};
// get seller crops in
export const fetchMyCrops = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/crops/my-crops`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "FETCH_MY_CROPS", payload: res.data });
};
// deleting a crop

export const deleteCrop = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/crops/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "DELETE_CROP", payload: id });
};
