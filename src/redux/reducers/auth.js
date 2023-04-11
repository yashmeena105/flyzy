import { LOGIN, LOG_OUT } from "redux/constant";

const initialState = {
  authuser: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, authuser: action.data };

    case LOG_OUT:
      localStorage.removeItem("uid");
      return { ...state, authuser: {} };
    default:
      return state;
  }
};

export default auth;
