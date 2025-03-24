const initialState = { myCrops: [], allCrops: [] };

export default function cropsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MY_CROPS":
      return { ...state, myCrops: action.payload };
    case "SET_ALL_CROPS":
      return { ...state, allCrops: action.payload };
    default:
      return state;
  }
}
