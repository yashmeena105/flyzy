import React from "react";

const Section = (props) => {
  const { children } = props;
  return <div style={{ padding: "10px 20px" }}>{children}</div>;
};

export default Section;
