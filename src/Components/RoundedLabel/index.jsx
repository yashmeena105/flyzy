import React from "react";
import "./styles.scss";
import icons from "Assets/Icons";
const RoundedLabel = ({ text, variant = "MEDIUM" }) => {
  return <div className={`rounded-label ${variant}`}>{text}</div>;
};

export default RoundedLabel;
