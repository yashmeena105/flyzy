import React from "react";
import "./styles.scss";
import icons from "Assets/Icons";
const PaxCount = ({ adults, children, infants, size = "small" }) => {
  return (
    <div className={`pax-count ${size}`}>
      <img src={icons.adult} alt="" />
      {adults}
      <div className="vline" />
      <img src={icons.child} alt="" />
      {children}
      <div className="vline" />
      <img src={icons.infant} alt="" />
      {infants}
    </div>
  );
};

export default PaxCount;
