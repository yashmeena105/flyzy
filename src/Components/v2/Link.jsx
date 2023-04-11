import React from "react";
import "./styles.scss";
const Link = ({ icon, onClick, children, type }) => {
  return (
    <span className={"link " + type} onClick={onClick}>
      {icon ? { icon } : <></>}
      {children}
    </span>
  );
};

export default Link;
