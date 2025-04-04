const initialState = { allCrops: [], myCrops: [] };

const cropsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_CROPS":
      return { ...state, allCrops: action.payload };
    case "FETCH_MY_CROPS":
      return { ...state, myCrops: action.payload };
    case "ADD_CROP":
      return { ...state, myCrops: [...state.myCrops, action.payload] };
    case "DELETE_CROP":
      return {
        ...state,
        myCrops: state.myCrops.filter((crop) => crop._id !== action.payload),
      };
    default:
      return state;
  }
};

export default cropsReducer;
