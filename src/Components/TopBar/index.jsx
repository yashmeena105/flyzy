import "./styles.scss";
import React from 'react'
const TopBar = ({title, onBackPress}) => {
  return (
    <div className="topbar">
      <p>{title}</p>
    </div>
  );
}

export default TopBar;
