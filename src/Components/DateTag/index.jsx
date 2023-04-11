import React from "react";
import "./styles.scss";
import icons from "Assets/Icons";
const DateTag = ({ text, type = "DATE" }) => {
  return (
    <div className="date-tag">
      <img
        className="ico"
        src={type == "TIME" ? icons.time : icons.calendar}
        alt=""
      />
      <div className="txt">{text}</div>
    </div>
  );
};

export default DateTag;
