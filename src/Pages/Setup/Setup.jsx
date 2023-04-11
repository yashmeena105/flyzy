import React, { useEffect, useState } from "react";
import img from "Assets";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { noimage } from "utils/constants";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { LogIn, LogOut } from "redux/actions/LoginAction";
import UserService from "services/UserService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateProfile } from "redux/actions/UserAction";
import { logout } from "Hooks/authentication";
import { auth } from "Config/firebase";
import { getRandomColor } from "utils/stringFunctions";

const { Title, Text } = Typography;
const { Option } = Select;

const Setup = () => {
  const { authuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refresh = async () => {
    let resp = await UserService.getMyProfile();
    console.log("prof", resp.data);
  };
  useEffect(() => {
    console.log("authuser in setup", authuser);
    refresh();
  }, []);

  let usr = authuser;

  const defaults = {
    userInfo: { ...usr },
    brand: usr?.displayName?.length > 0 ? usr?.displayName + "'s org" : null,
  };

  console.log("defaults", defaults);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState(null);

  const [form1] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("formValues", values);
    let newUsrInfo = { ...usr };
    newUsrInfo = { ...newUsrInfo, ...values.userInfo };
    console.log("newUserInfo", newUsrInfo);
    let payload = {
      ...values,
      userInfo: newUsrInfo,
      industry,
      color: getRandomColor(),
    };
    console.log("payload", payload);
    setLoading(true);
    let response = await UserService.createMyProfile(payload);
    if (response.success) {
      let resp = await UserService.getMyProfile();
      if (resp.success) {
        console.log("my profile response", resp.data);
        dispatch(LogIn(resp.data.fbUser));
        dispatch(UpdateProfile(resp.data.profile));
      }
      setLoading(false);
      navigate("/dashboard");
    } else {
      message.error(response.error);
    }
    setLoading(false);
  };

  const steps = () => [
    <div
      style={{
        display: step == 0 ? null : "none",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          width: "100%",
          textAlign: "center",
          padding: "60px",
        }}
      >
        Database of 100+ destinations by providers from across the globe is
        waiting for you{" "}
      </div>
      <Row
        gutter={32}
        justify="center"
        style={{ padding: "10px", fontSize: "24px", color: "gray" }}
      >
        Select your Industry below:
      </Row>
      <Row gutter={32} justify="center" style={{ padding: "40px" }}>
        <Col>
          <Button
            style={{ height: "120px", width: "280px", fontSize: "32px" }}
            onClick={() => {
              setIndustry("CORPORATE");
              setStep(1);
            }}
          >
            Corporate
          </Button>
        </Col>
        <Col>
          <Button
            style={{ height: "120px", width: "280px", fontSize: "32px" }}
            onClick={() => {
              setIndustry("TRAVEL_AGENCY");
              setStep(1);
            }}
          >
            Travel Agency
          </Button>
        </Col>
      </Row>
    </div>,
    <Row
      justify="center"
      style={{
        display: step == 1 ? null : "none",
      }}
    >
      <div
        style={{
          marginTop: "30px",
          width: "800px",
          border: "1px solid lightgray",
          borderRadius: "32px",
          overflow: "clip",
        }}
      >
        <Row>
          <Col span={12}>
            <img
              src={img.setup}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "50px",
              }}
            />
          </Col>
          <Col style={{ padding: "18px" }} span={12}>
            <Row justify="center">
              <Title level={2}>Welcome to ZERO</Title>
            </Row>
            <Row justify="center">
              <Title level={5} style={{ textAlign: "center" }}>
                Get 1000+ options to choose from and make your travel seamless
                with zero commission
              </Title>
            </Row>
            <Form.Item label="Your Brand/Company Name" name="brand">
              <Input placeholder="Your Brand/Company Name" />
            </Form.Item>
            <Row gutter={12}>
              <Col>
                <Form.Item>
                  <Button
                    onClick={() => {
                      setStep(0);
                    }}
                  >
                    Back
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      form1.validateFields();
                      setStep(2);
                    }}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Row>,
    <Row
      justify="center"
      style={{
        display: step == 2 ? null : "none",
      }}
    >
      <div
        style={{
          marginTop: "30px",
          width: "800px",
          border: "1px solid lightgray",
          borderRadius: "32px",
          overflow: "clip",
        }}
      >
        <Row>
          <Col span={12}>
            <img
              src={img.setup}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "50px",
              }}
            />
          </Col>
          <Col style={{ padding: "18px" }} span={12}>
            <Row justify="center">
              <Title level={5} style={{ textAlign: "center" }}>
                Register
              </Title>
            </Row>
            <Form.Item label="Your Name" name={["userInfo", "displayName"]}>
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name={["userInfo", "email"]}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="Mobile No." name={["userInfo", "phoneNumber"]}>
              <Input placeholder="Enter mobile number" />
            </Form.Item>
            <Form.Item label="Current Location" name={["questions", "address"]}>
              <Input placeholder="Enter full address" />
            </Form.Item>
            <Row gutter={12}>
              <Col>
                <Form.Item>
                  <Button
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    Back
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      setStep(3);
                    }}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Row>,
    industry == "TRAVEL_AGENCY" ? (
      <Row
        justify="center"
        style={{
          display: step == 3 ? null : "none",
          width: "100%",
          transition: "display 2s",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            width: "800px",
            border: "1px solid lightgray",
            borderRadius: "32px",
            overflow: "clip",
          }}
        >
          <Row justify={"center"}>
            <Col style={{ padding: "18px" }} span={18}>
              <Row justify="center">
                <Title level={5} style={{ textAlign: "center" }}>
                  Share some information to enhance Personalization
                </Title>
              </Row>
              <>
                <Form.Item
                  label="Which destination you specialize in?"
                  name={["questions", "specialization"]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  label="How many trip do you manage in a month?"
                  name={["questions", "tripCount"]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="How do you manage your billings?"
                  name={["questions", "billingManagement"]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={12} justify="center">
                  <Col>
                    <Form.Item>
                      <Button
                        size="large"
                        onClick={() => {
                          setStep(2);
                        }}
                      >
                        Back
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            </Col>
          </Row>
        </div>
      </Row>
    ) : (
      <Row
        justify="center"
        style={{
          display: step == 3 ? null : "none",
          width: "100%",
          transition: "display 2s",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            width: "800px",
            border: "1px solid lightgray",
            borderRadius: "32px",
            overflow: "clip",
          }}
        >
          <Row justify={"center"}>
            <Col style={{ padding: "18px" }} span={18}>
              <Row justify="center">
                <Title level={5} style={{ textAlign: "center" }}>
                  Share some information to enhance Personalization
                </Title>
              </Row>
              <>
                <Form.Item
                  label="Which destination do you travel more often?"
                  name={["questions", "freq_destination"]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  label="How many employees do you have?"
                  name={["questions", "employee_count"]}
                >
                  <Select>
                    <Option value="1-19">1-19</Option>
                    <Option value="20-99">20-99</Option>
                    <Option value="100+">100+</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="How do you manage your billings?"
                  name={["questions", "billingManagement"]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={12} justify="center">
                  <Col>
                    <Form.Item>
                      <Button
                        size="large"
                        onClick={() => {
                          setStep(2);
                        }}
                      >
                        Back
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            </Col>
          </Row>
        </div>
      </Row>
    ),
  ];
  return (
    <Spin spinning={loading}>
      <div
        style={{
          padding: "6vh 6vw 0vw 6vw",
          height: "100vh",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Row justify={"space-between"} align="middle">
          <Col>
            <span
              style={{
                fontFamily: "Ubuntu",
                color: "#0057ad",
                fontWeight: 700,
                WebkitUserSelect: "none",
                fontSize: "32px",
                msUserSelect: "none",
                userSelect: "none",
              }}
            >
              <span style={{ color: "black" }}>ZERO</span>
            </span>
          </Col>
          <Col>
            <Space>
              <>
                <span style={{ color: "#0057ad", fontWeight: "500" }}>
                  STEP : {step + 1}
                </span>
                /{steps().length}
              </>
              <Button
                size="small"
                type="text"
                danger
                onClick={async () => {
                  await logout();
                  dispatch(LogOut());
                }}
              >
                Logout
              </Button>
            </Space>
          </Col>
        </Row>
        <Form
          form={form1}
          layout="vertical"
          initialValues={defaults}
          style={{ padding: "30px" }}
          onFinish={handleSubmit}
        >
          {steps().map((s) => s)}
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img src={img.zero} width="600px" style={{ opacity: 0.2 }}></img>
        </div>
      </div>
    </Spin>
  );
};

export default Setup;
