export const setFarmers = (farmers) => ({
  type: "SET_FARMERS",
  payload: farmers,
});

export const fetchFarmers = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://msp-qdwr.onrender.com/users/farmers", {
    headers: { Authorization: token },
  });
  const data = await response.json();
  if (response.ok) dispatch(setFarmers(data));
};
