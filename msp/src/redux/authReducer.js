const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};
// initial state for the refference
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.user.role,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return initialState;
    // updating the store
    default:
      return state;
  }
}
