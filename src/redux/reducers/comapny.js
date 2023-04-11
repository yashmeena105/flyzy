import { ASSIGN_MEMBER } from "redux/constant";

const initialState = {
  MemberList: [],
};

const AssignMember = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_MEMBER:
      return { ...state, MemberList: action.data };
    default:
      return state;
  }
};

export default AssignMember;