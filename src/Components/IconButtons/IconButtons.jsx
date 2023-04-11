import React from "react";
import "./styles.scss";
import icons from "Assets/Icons";
const IconButtons = ({options}) => {
  
  return (
    <div className="iconButtonsContainer">
      {options.map((o) => {
        return (
          <>
            <div className="iconPlusLabel">
              <img src={o.icon} alt="" />
              <div className="icon">{o.label}</div>
            </div>
            {(o.index+1)===options.length?<></>:<div className="line-vert"></div>}
          </>
        );
      })}
    </div>
  );
};

export default IconButtons;
