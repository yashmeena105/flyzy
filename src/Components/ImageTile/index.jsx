import React from "react";
import "./styles.scss";
import CancelIcon from "@mui/icons-material/Cancel";
const ImageTile = ({ category, image }) => {
  return (
    <div className="imageTile">
      {image ? <img className="tile" src={image?.url} alt="" /> : ""}
      {image ? <></> : <CancelIcon className="cross" />}
    </div>
  );
};

export default ImageTile;
