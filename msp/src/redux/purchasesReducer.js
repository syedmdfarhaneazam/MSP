const initialState = { myPurchases: [] };

export default function purchasesReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MY_PURCHASES":
      return { ...state, myPurchases: action.payload };
    default:
      return state;
  }
}
