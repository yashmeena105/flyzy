import "./styles.scss";
import React from "react";
import SimpleSelect from "Components/SimpleSelect";
import ThreeDotMenu from "Components/ThreeDotMenu";
import { getInitials } from "utils/stringFunctions";
import { Avatar } from "antd";
const MemberRow = ({ data, index }) => {
  console.log("data", data);
  const options = [
    { value: "member", label: "Member" },
    { value: "ADMIN", label: "Admin" },
  ];

  return (
    <div className="lead-row">
      <Avatar
        size="large"
        src={data?.photoUrl}
        style={{ backgroundColor: data?.color }}
      >
        {getInitials(data?.name)}
      </Avatar>
      <div className="flex-1">{data?.name}</div>
      <div className="flex-2">{data?.email}</div>
      <div className="flex-1">
        <SimpleSelect options={[{ value: data?.role, label: data?.role }]} />
      </div>
      <div className="flex-2">{data?.active ? "Active Now" : "Not Active"}</div>
      <ThreeDotMenu />
    </div>
  );
};

export default MemberRow;
