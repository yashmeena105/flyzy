import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
const Item = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`item ${
        `/${item.route}` === window.location.pathname ? "active" : ""
      }`}
      onClick={() => {
        navigate(`/${item.route}`);
      }}
    >
      <div className="stick"></div>
      {/* <img src={`Assets/Icons/${item.icon}`} alt="" /> */}
      {item.text}
    </div>
  );
};

export default Item;
