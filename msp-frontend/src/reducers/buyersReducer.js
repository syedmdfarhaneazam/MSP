const initialState = { buyers: [] };

const buyersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BUYERS":
      return { ...state, buyers: action.payload };
    default:
      return state;
  }
};

export default buyersReducer;
