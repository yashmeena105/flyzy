import React from "react";
import "./styles.scss";
const ImagePreview = ({ category, image }) => {
  return (
    <div className="imagePreview">
      <img className="tile" src={image.url} alt="" />
    </div>
  );
};

export default ImagePreview;
