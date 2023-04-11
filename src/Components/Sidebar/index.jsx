import React from "react";
import "./styles.scss";
import Item from "./Item";
import Avatars from "./Avatars";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    text: "Dashboard",
    route: "dashboard",
  },
  {
    text: "Marketplace",
    route: "marketplace",
  },
  {
    text: "All Leads",
    route: "leads",
  },
  {
    text: "Image Gallery",
    route: "media",
  },
  {
    text: "Payments & Billing",
    route: "payments",
  },
  {
    text: "Bookings & History",
    route: "orders",
  },
  {
    text: "Reports",
    route: "reports",
  },
  {
    text: "My Listings",
    route: "master",
  },
  {
    text: "Settings",
    route: "settings",
  },
];
const menu = menuItems.map((i, index) => {
  return <Item key={index} item={i} />;
});

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <span className="bold">ZERO</span>
        </div>
      </div>
      <div className="iconBtns">
        <CircleNotificationsIcon
          onClick={() => {
            navigate(`/notifications`);
          }}
          style={{ color: "#1677ff" }}
        />
        <ForumIcon
          onClick={() => {
            navigate(`/chats`);
          }}
        />
      </div>
      <div className="content">{menu}</div>
      <div className="footer">
        <Avatars />
      </div>
    </div>
  );
};

export default Sidebar;
