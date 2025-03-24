const initialState = { buyers: [] };

export default function buyersReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BUYERS":
      return { ...state, buyers: action.payload };
    default:
      return state;
  }
}
