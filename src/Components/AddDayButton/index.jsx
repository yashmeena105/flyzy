import React from "react";
import "./styles.scss";
import Add from "@mui/icons-material/Add";
const AddDayButton = ({ text }) => {
  return (
    <div className="addDay">
      {text}
      {/* <Add className="add" /> */}
    </div>
  );
};

export default AddDayButton;
