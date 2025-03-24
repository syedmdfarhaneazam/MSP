export const loginSuccess = (user) => ({
  // notify
  type: "LOGIN_SUCCESS",
  payload: { user },
});

export const updateUser = (user) => ({
  // notify
  type: "UPDATE_USER",
  payload: user,
});

export const logout = () => ({
  // notify
  type: "LOGOUT",
  // working
});

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess(data.user));
      localStorage.setItem("token", data.token);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    // just for now
    throw error;
  }
};

export const signup = (userData) => async () => {
  const response = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
};
