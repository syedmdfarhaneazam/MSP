const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAIL":
    case "SIGNUP_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, error: null };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export default authReducer;
