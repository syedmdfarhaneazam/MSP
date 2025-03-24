const initialState = { farmers: [] };

export default function farmersReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FARMERS":
      return { ...state, farmers: action.payload };
    default:
      return state;
  }
}
