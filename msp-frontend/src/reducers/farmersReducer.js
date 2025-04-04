const initialState = { farmers: [] };

const farmersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_FARMERS":
      return { ...state, farmers: action.payload };
    default:
      return state;
  }
};

export default farmersReducer;
