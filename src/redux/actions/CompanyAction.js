import { ASSIGN_MEMBER } from "redux/constant";

export const CompanyMember = (data) => {
  return { type: ASSIGN_MEMBER, data: data };
};

