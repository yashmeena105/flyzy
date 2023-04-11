import React from "react";
import "./styles.scss";
import icons from "Assets/Icons";
const AppUsageIcon = ({ active }) => {
  return (
    <div>
      <img src={active ? icons.gphone : icons.phone} alt="" />
    </div>
  );
};

export default AppUsageIcon;
