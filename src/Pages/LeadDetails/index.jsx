import "./styles.scss";
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
import Details from "./Details";
import { useNavigate, useParams } from "react-router-dom";
import Payment from "./Payment/index";
import LeadStatusTimeline from "Components/LeadStatusTimeline";
import LeadDrawerForm from "Forms/LeadDrawerForm";
import { ref } from "yup";
import LeadService from "services/LeadService";
import LeadItineraries from "./LeadItineraries/LeadItineraries";
import ChatHome from "./Chats/ChatHome";
import TripDocuments from "./TripDocuments";
import { status } from "utils/constants";
const { Content } = Layout;
const { Text } = Typography;

const LeadDetails = () => {
  let { id, key } = useParams();
  const [currentTab, setCurrentTab] = useState(key);
  const [leadData, setLeadData] = useState({});
  const [loading, setLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(false);

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getLead(id);
    if (resp.success) {
      setLeadData(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  const navigate = useNavigate();
  const contentRef = useRef();

  useEffect(() => {
    refresh();
    setCurrentTab(key);
    setContentHeight(contentRef.current.clientHeight);
  }, [key]);

  const onClick = (value) => {
    setCurrentTab(value.key);
    navigate(`/leads/${id}/${value.key}`);
  };

  const menuItems = [
    {
      label: "Lead Details",
      key: "details",
      icon: <InfoCircleOutlined />,
    },
    {
      label: "Trip Planner",
      key: "planner",
      icon: <MapOutlinedIcon />,
    },
    {
      label: "Communications",
      key: "communications",
      icon: <CommentOutlined />,
    },
    {
      label: "Payments & Billing",
      key: "payments",
      icon: <PercentageOutlined />,
    },
    {
      label: "Trip Documents",
      key: "documents",
      icon: <FileDoneOutlined />,
    },
  ];

  const content =
    currentTab == "details" ? (
      <Details parentHeight={contentHeight} parentRefresh={refresh} />
    ) : currentTab == "planner" ? (
      <LeadItineraries parentHeight={contentHeight} />
    ) : currentTab == "payments" ? (
      <Payment parentHeight={contentHeight} />
    ) : currentTab == "communications" ? (
      <ChatHome parentHeight={contentHeight} />
    ) : currentTab == "documents" ? (
      <TripDocuments parentHeight={contentHeight} />
    ) : (
      <></>
    );

  const handleChangeStatus = (value) => {
    console.log(value);
  };

  const getCurrentIndexFromStatus = () => {
    console.log(leadData.status);
    switch (leadData.status) {
      case status.NEW:
        return 0;
      case status.PROPOSAL_SENT:
        return 2;
      case status.FOLLOW_UP:
        return 2;
      case status.CONFIRMED:
        return 3;
      case status.ONGOING_TRIP:
        return 3;
      case status.CLOSED_LOST:
        return 4;
      case status.CLOSED_WON:
        return 5;
      default:
        return 2;
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
          padding: "12px",
          border: "1px solid #e6f4ff",
          padding: "12px",
          paddingRight: "24px",
          borderRadius: "36px",
        }}
      >
        <Steps
          size="small"
          status={leadData.status == status.CLOSED_LOST ? "error" : null}
          current={getCurrentIndexFromStatus()}
          items={[
            {
              title: "New",
            },
            {
              title: "Proposal Sent",
              // description: (
              //   <Button size="small" style={{}} onClick={() => {}}>
              //     View Proposal
              //   </Button>
              // ),
            },
            {
              title: "Trip Confirmed",
            },
            {
              title: "Closed",
              status: leadData.status == status.CLOSED_LOST ? "error" : null,
            },
          ]}
        />
      </div>
      <div>
        <Menu
          onClick={onClick}
          // style={{
          //   width: "100%",
          // }}
          defaultSelectedKeys={[key]}
          selectedKeys={[key]}
          theme="light"
          mode="horizontal"
          items={menuItems}
        />
      </div>
      {/* <Row justify={"end"} style={{ padding: "6px" }} gutter={[12, 6]}>
          <Select
            labelInValue
            defaultValue={{
              value: "new",
              label: "New",
            }}
            style={{
              width: 150,
              margin: "0 12px",
            }}
            onChange={handleChangeStatus}
            options={[
              {
                value: "new",
                label: "New",
              },
              {
                value: "proposed",
                label: "Proposal Sent",
              },
              {
                value: "confirmed",
                label: "Confirmed",
              },
            ]}
          />
          <Button
            onClick={() => {
              setLeadDrawerOpen(true);
            }}
            icon={<EditOutlined />}
          >
            Edit Lead Details
          </Button>
        </Row> */}
      {/* <Spin
          tip="Loading"
          spinning={loading}
          style={{ flex: 1, border: "1px solid gold" }}
        ></Spin> */}
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

export default LeadDetails;
