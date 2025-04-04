import axios from "axios";
import { API_URL } from "../config";

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    const { token, user } = res.data;
    console.log("Login response:", res.data); // check log
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  } catch (err) {
    console.error("Login error:", err.response?.data);
    dispatch({
      type: "LOGIN_FAIL",
      payload: err.response?.data.message || "Login failed",
    }); // from here we got everything unlike before
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, userData);
    const { token, user } = res.data;
    console.log("Signup response:", res.data); // logged it
    localStorage.setItem("token", token);
    dispatch({ type: "SIGNUP_SUCCESS", payload: user });
  } catch (err) {
    console.error("Signup error:", err.response?.data);
    dispatch({
      type: "SIGNUP_FAIL",
      payload: err.response?.data.message || "Signup failed",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
}; // deleted everything
// to delete all data we depend oon the reducer

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API_URL}/users/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "UPDATE_USER", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
// to save all data we deppend on the reducer

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return dispatch({ type: "LOGOUT" });

  try {
    const res = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }
};
