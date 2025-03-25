export const setMyPurchases = (purchases) => ({
  type: "SET_MY_PURCHASES",
  payload: purchases,
});

export const fetchMyPurchases = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://msp-qdwr.onrender.com/purchases/my-purchases",
    {
      headers: { Authorization: token },
    },
  );
  const data = await response.json();
  if (response.ok) dispatch(setMyPurchases(data));
};
