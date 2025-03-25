export const setMyCrops = (crops) => ({
  type: "SET_MY_CROPS",
  payload: crops,
});

export const fetchMyCrops = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://msp-qdwr.onrender.com/crops/my-crops", {
    headers: { Authorization: token },
  });
  const data = await response.json();
  if (response.ok) dispatch(setMyCrops(data));
};

export const addCrop = (cropData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://msp-qdwr.onrender.com/crops", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(cropData),
  });
  if (response.ok) dispatch(fetchMyCrops());
};

export const deleteCrop = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://msp-qdwr.onrender.com/crops/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (response.ok) dispatch(fetchMyCrops());
};
export const setAllCrops = (crops) => ({
  type: "SET_ALL_CROPS",
  payload: crops,
});

export const fetchAllCrops = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://msp-qdwr.onrender.com/crops", {
    headers: { Authorization: token },
  });
  const data = await response.json();
  if (response.ok) dispatch(setAllCrops(data));
};
