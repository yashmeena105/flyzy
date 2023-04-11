import React from "react";
import "./styles.scss";
import icons from 'Assets/Icons'
const DestinationTag = ({ text }) => {
  return (
    <div className="destination-tag">
      {text}
    </div>
  );
};

export default DestinationTag;
