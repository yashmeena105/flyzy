import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Space,
  Statistic,
  Tour,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import UserService from "services/UserService";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {
  PlusOutlined,
  BuildOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Funnel from "./Funnel";
import PieChart from "./PieChart";
import CapLabel from "Components/v2/CapLabel";
import Doughnut from "./Doughnut";
import Link from "Components/v2/Link";
import img from "Assets";
import dayjs from "dayjs";
import CustomerPayments from "Pages/Payments/CustomerPayments";

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Dashboard = () => {
  const [show, setshow] = useState("");
  const handleClose = () => {
    setshow("none");
    // console.log("close btn clicked");
    // alert("Do you really want to close");
  };

  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.addNotificationToken();
  }, []);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const chartCardRef = useRef();
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "Add new Leads",
      description: "Manage all your leads and trips in one place",
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: "Analytics",
      description: "Show summarized data right on your dashboard",
      target: () => ref2.current,
    },
    {
      title: "Start Over",
      description: "Click to start the tour from beginning.",
      target: () => ref3.current,
    },
  ];

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        padding: "12px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Row justify="space-between" align="middle" style={{ padding: "12px 0" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>Dashboard</div>
        <Space style={{ color: "gray" }}>
          <RangePicker defaultValue={[dayjs(), dayjs()]} />
          {/* {new Date().toDateString()} */}
          <Button icon={<SearchOutlined />} style={{ color: "#d9d9d9" }} />
        </Space>
      </Row>
      <Row
        style={{
          backgroundColor: "#F7E5E9",
          borderRadius: "8px",
          padding: "20px 20px 30px 50px",
          height: "auto",
          display: show,
        }}
        justify="space-between"
      >
        <div
          style={{
            height: "50px",
            width: "100%",
            alignContent: "right",
          }}
        >
          <Button
            icon={<CloseOutlined style={{ color: "gray" }} />}
            style={{
              marginLeft: "95%",
            }}
            type="text"
            shape="circle"
            onClick={handleClose}
          />
        </div>
        <Col span={12}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#FD7D88",
              paddingTop: "12px",
            }}
          >
            Welcome back {profile?.user_info?.display_name?.split(" ")[0]}!
          </div>
          <div style={{ marginTop: "16px", fontSize: "12px", color: "gray" }}>
            Welcome to{" "}
            <span style={{ fontWeight: "bold", fontFamily: "Ubuntu" }}>
              ZERO
            </span>{" "}
            by Flyzy. We help you manage and connect with 200+ DMCs and D2C
            travel agents without any overhead commissions.
            <br />
            <br />
            <span style={{ textAlign: "right", width: "100%" }}>
              <Link type="secondary">Learn more</Link> •{" "}
              <Link type="secondary">Take a tour</Link>
            </span>
          </div>
        </Col>
        <Col style={{}} flex="auto">
          <Row justify="space-between">
            <Col flex={"auto"}>
              <Row justify={"center"}>
                <img
                  style={{
                    position: "relative",
                    top: "-30px",
                    height: "170px",
                  }}
                  src={img.girl}
                ></img>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Row gutter={12}>
        <Col span={12} ref={ref1}>
          <Card
            style={{ backgroundColor: "orange", color: "white" }}
            hoverable
            onClick={() => {
              navigate("/leads");
            }}
          >
            <Row gutter={12} justify="center">
              <Col>
                <PlusOutlined />
              </Col>
              <Col>Add a new Lead</Col>
            </Row>
          </Card>
        </Col>
        <Col span={12} ref={ref3}>
          <Card
            style={{ backgroundColor: "lightblue", color: "black" }}
            hoverable
            onClick={() => setOpen(true)}
          >
            <Row gutter={12} justify="center">
              <Col>
                <BuildOutlined />
              </Col>
              <Col>Take a tour of ZERO</Col>
            </Row>
          </Card>
        </Col>
      </Row> */}
      <Row gutter={12}>
        <Col ref={ref2} flex="auto">
          <Card
            size="small"
            title={<CapLabel>Leads by source</CapLabel>}
            ref={chartCardRef}
            style={{ height: "240px", width: "100%" }}
          >
            <Doughnut />
          </Card>
        </Col>
        <Col ref={ref2} flex="auto">
          <Card
            size="small"
            title={<CapLabel>Conversion funnel</CapLabel>}
            style={{
              height: "240px",
              width: "100%",
            }}
          >
            <Funnel />
          </Card>
        </Col>
        <Col flex="auto">
          <Card
            size="small"
            title={<CapLabel>Leads lost for reason</CapLabel>}
            style={{
              height: "240px",
              width: "100%",
            }}
          >
            <PieChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row>
              <Card
                size="small"
                style={{ width: "100%" }}
                title={
                  <Row>
                    <Col flex="auto">
                      <CapLabel>Total Paid</CapLabel>
                    </Col>
                    <Col flex="auto">
                      <CapLabel>Total Pending</CapLabel>
                    </Col>
                  </Row>
                }
              >
                <Row>
                  <Col flex="auto" style={{ padding: "12px" }}>
                    <Statistic
                      title="1 Payments"
                      value={45000}
                      precision={2}
                      prefix="₹"
                    />
                  </Col>
                  <Col flex="auto" style={{ padding: "12px" }}>
                    <Statistic
                      title="1 Payments"
                      value={55800}
                      precision={2}
                      prefix="₹"
                    />
                  </Col>
                </Row>
              </Card>
            </Row>
            <CustomerPayments minimal />
          </Space>
        </Col>
        <Col span={12}>
          <Row></Row>
        </Col>
      </Row>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Space>
  );
};

export default Dashboard;
