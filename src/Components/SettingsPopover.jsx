import {
  Avatar,
  Button,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  ArrowRightOutlined,
  UserAddOutlined,
  AppleFilled,
  AndroidFilled,
} from "@ant-design/icons";

import React from "react";
import { useSelector } from "react-redux";
import { getInitials } from "utils/stringFunctions";
import { useNavigate } from "react-router-dom";
import { logout } from "Hooks/authentication";
import { LogOut } from "redux/actions/LoginAction";
import { useDispatch } from "react-redux";

const { Text, Title } = Typography;

const SettingsPopover = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div
        style={{
          width: "100%",
          background:
            "linear-gradient(259.82deg, #1677ff -21.18%, #1F1F1F 54.95%)",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            color: "white",
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              fontFamily: "Ubuntu",
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          >
            ZERO
          </div>
          <div style={{}}>Direct is Correct</div>
          <div style={{ height: "12px" }}></div>
          <Button size="small" ghost style={{ width: "min-content" }}>
            <Space>
              Join the Waitlist
              <ArrowRightOutlined />
            </Space>
          </Button>
        </div>
      </div>
      <Row>
        <Col
          span={12}
          style={{ padding: "12px", borderRight: "1px solid #0505050f" }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Space style={{ paddingBottom: "12px" }}>
              <Avatar
                size="small"
                src={profile.company_id?.logo?.url}
                style={{
                  backgroundColor: profile.company_id?.logo?.color ?? null,
                }}
              >
                {getInitials(profile.company_id.brand_name)}
              </Avatar>
              <Text strong>{profile.company_id.brand_name}</Text>
            </Space>
            <Button
              type="text"
              onClick={() => {
                navigate("/settings/company");
              }}
            >
              Settings
            </Button>
            <Button
              type="text"
              onClick={() => {
                navigate("/people");
              }}
            >
              <Space>
                People
                <Tag color="blue-inverse" icon={<UserAddOutlined />}>
                  Invite
                </Tag>
              </Space>
            </Button>
            <Button type="text">Reports</Button>
            <Button
              type="text"
              onClick={() => {
                navigate("/customers");
              }}
            >
              Customers
            </Button>
          </div>
        </Col>
        <Col span={12} style={{ padding: "12px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Space style={{ paddingBottom: "12px" }}>
              <Avatar
                size="small"
                src={profile?.user_info?.photo_url}
                style={
                  {
                    // backgroundColor: profile?.user_info?.color ?? "orange",
                  }
                }
              >
                {getInitials(profile?.user_info?.display_name)}
              </Avatar>
              <Text strong>{profile?.user_info?.display_name}</Text>
            </Space>
            <Button
              type="text"
              onClick={() => {
                navigate("/settings/me");
              }}
            >
              My Settings
            </Button>
            <Button type="text">Notifications</Button>
            <Divider />
            <Button type="text">Help</Button>
            <Button
              type="text"
              onClick={() => {
                logout();
                dispatch(LogOut());
              }}
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>
      <div
        style={{
          borderTop: "1px solid #0505050f",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
        }}
      >
        <Text>DOWNLOAD FLYZY APP:</Text>
        <div>
          <Button type="text" icon={<AppleFilled />}></Button>
          <Button type="text" icon={<AndroidFilled />}></Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopover;
