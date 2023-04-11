import { UPDATE_PROFILE } from "redux/constant";

const initialState = {
  profile: {},
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, profile: action.data };
    default:
      return state;
  }
};

export default profile;