import { combineReducers } from "redux";
import AssignMember from "./comapny";
import auth from "./auth";
import profile from "./profile";
const RootReducers = combineReducers({
    auth: auth,
    AssignMember: AssignMember,
    profile: profile,
})

export default RootReducers;