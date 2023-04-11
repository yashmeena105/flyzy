import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PercentageOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Select,
  Col,
  Layout,
  Menu,
  Button,
  Spin,
  message,
  Steps,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ref } from "yup";
import PaymentsService from "services/PaymentsService";
import Section from "Components/v2/Section";
import LeadService from "services/LeadService";
import CustomerPayments from "./CustomerPayments";
const { Content } = Layout;
const { Text } = Typography;

const Payments = () => {
  const [currentTab, setCurrentTab] = useState("customer");
  const [paymentsData, setPaymentsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(false);

  const navigate = useNavigate();
  const contentRef = useRef();

  useEffect(() => {
    setContentHeight(contentRef.current.clientHeight);
  }, [currentTab]);

  const onClick = (value) => {
    setCurrentTab(value.key);
  };

  const menuItems = [
    {
      label: "Customer Payments",
      key: "customer",
      icon: <InfoCircleOutlined />,
    },
    // {
    //   label: "Supplier Billing",
    //   key: "supplier",
    //   icon: <PercentageOutlined />,
    // },
  ];

  const content =
    currentTab == "customer" ? (
      <Section parentHeight={contentHeight}>
        <CustomerPayments />
      </Section>
    ) : currentTab == "supplier" ? (
      <Section parentHeight={contentHeight}>Supplier Billing</Section>
    ) : (
      <></>
    );

  const handleChangeStatus = (value) => {
    console.log(value);
  };

  const getCurrentIndexFromStatus = () => {
    switch (paymentsData.status) {
      case "NEW":
        return 1;
      default:
        return 0;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflowY: "auto",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          margin: "12px",
          border: "1px solid #e6f4ff",
          padding: "12px",
          paddingRight: "24px",
          borderRadius: "36px",
        }}
      >
        Analytics
      </div>
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={currentTab}
          // style={{
          //   width: "100%",
          // }}
          theme="light"
          mode="horizontal"
          items={menuItems}
        />
      </div>
      <div
        ref={contentRef}
        style={{
          flex: 1,
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Payments;
