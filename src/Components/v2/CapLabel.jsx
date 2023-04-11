import React from "react";

const CapLabel = ({ children }) => {
  return (
    <div
      style={{ fontSize: "10px", textTransform: "uppercase", color: "#69737d" }}
    >
      {children}
    </div>
  );
};

export default CapLabel;
