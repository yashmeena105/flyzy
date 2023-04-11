import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  FileImageOutlined,
  SettingOutlined,
  MessageOutlined,
  PercentageOutlined,
  UserOutlined,
  AntDesignOutlined,
  CaretDownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Menu,
  Popover,
  Row,
  Tooltip,
  Typography,
} from "antd";
import icons from "Assets/Icons";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SettingsPopover from "./SettingsPopover";
import arrowDownIcon from "../Assets/Icons/arrowdown.svg";
import { useSelector } from "react-redux";
import { getInitials } from "utils/stringFunctions";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const { Text } = Typography;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { profile } = useSelector((state) => state.profile);

  const items = [
    getItem("Dashboard", "dashboard", <PieChartOutlined />),
    getItem("Marketplace", "marketplace", <DesktopOutlined />),
    getItem(
      "My Queries",
      "queries",
      // <Badge
      //   count={2}
      //   size="small"
      //   dot={collapsed}
      //   style={{ marginTop: collapsed ? "8px" : null }}
      // >
      //   <MessageOutlined />
      // </Badge>
      <MessageOutlined />
    ),
    getItem("All Leads", "leads", <ContainerOutlined />),
    getItem("Image Gallery", "media", <FileImageOutlined />),
    getItem("Payments & Billing", "payments", <PercentageOutlined />),
    // getItem("Bookings & History", "orders", <ConfirmationNumberOutlinedIcon />),
    // getItem("Reports", "reports", <ContainerOutlined />),
    getItem("My Listings", "master", <ContainerOutlined />),
  ];
  const currentItem = items.filter(
    (i) => `/${i.key}` === window.location.pathname
  );

  return (
    <div
      style={{
        position: "relative",
        width: "min-content",
        color: "",
        borderRight: "1px solid #0505050f",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "14px 10px",
        }}
      >
        <Badge count="BETA" size="small" offset={[12, 0]}>
          <div
            style={{
              fontFamily: "Ubuntu",
              color: "#0057ad",
              fontWeight: 700,
              fontSize: collapsed ? null : "22px",
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
              maxWidth: "100%",
            }}
          >
            <span style={{ color: "black" }}>ZERO</span>
          </div>
        </Badge>
      </Row>
      <div style={{ flex: 1 }}>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col style={{ height: "fit-content" }}>
            <Menu
              defaultSelectedKeys={[currentItem[0]?.key]}
              selectedKeys={[currentItem[0]?.key]}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
              style={{ height: "fit-content", border: "none" }}
              items={items}
              onClick={(e) => {
                navigate(`/${e.key}`);
              }}
            />
          </Col>
        </Row>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          padding: collapsed ? "0" : "0 12px 0px 18px",
        }}
      >
        <Popover
          content={<SettingsPopover />}
          placement="topLeft"
          trigger="click"
          arrow={false}
        >
          <div
            style={{
              width: "min-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0",
              cursor: "pointer",
            }}
          >
            <Avatar.Group>
              <Avatar
                src={profile.company_id?.logo?.url}
                style={{
                  backgroundColor: profile.company_id?.logo?.color ?? null,
                }}
              >
                {getInitials(profile.company_id.brand_name)}
              </Avatar>
              <Avatar
                src={profile?.user_info?.photo_url}
                style={{
                  backgroundColor: profile?.user_info?.color ?? "orange",
                }}
              >
                {getInitials(profile?.user_info?.display_name)}
              </Avatar>
            </Avatar.Group>
            <div style={{ color: "gray", fontSize: "12px" }}>
              <CaretDownOutlined />
            </div>
          </div>
        </Popover>
        {!collapsed && (
          <Tooltip title="Help">
            <Button type="text" icon={<QuestionCircleOutlined />}></Button>
          </Tooltip>
        )}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: collapsed ? "10px" : "12px",
          padding: "12px 6px",
          background: "#f0f0f0",
          textAlign: "center",
        }}
      >
        Powered by Flyzy
      </div>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          position: "absolute",
          bottom: "18%",
          right: "0",
          zIndex: 3,
          borderRadius: "4px 0px 0px 4px",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};
export default Sidebar;
