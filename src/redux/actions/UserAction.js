import { UPDATE_PROFILE } from "redux/constant";

export const UpdateProfile = (profileData) => {
  return { type: UPDATE_PROFILE, data: profileData };
};