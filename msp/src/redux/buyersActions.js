export const setBuyers = (buyers) => ({
  type: "SET_BUYERS",
  payload: buyers,
});

export const fetchBuyers = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://msp-qdwr.onrender.com/users/buyers", {
    headers: { Authorization: token },
  });
  const data = await response.json();
  if (response.ok) dispatch(setBuyers(data));
};
