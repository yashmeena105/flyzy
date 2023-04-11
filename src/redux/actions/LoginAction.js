import { LOGIN, LOG_OUT } from "redux/constant";

export const LogIn = (loginData) => {
  return { type: LOGIN, data: loginData };
};

export const LogOut = () => {
  return { type: LOG_OUT };
};
