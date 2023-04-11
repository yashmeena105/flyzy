import {
  Form,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Divider,
  Col,
  Layout,
  message,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithEmail, signUpWithGoogle } from "Hooks/authentication";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogIn } from "redux/actions/LoginAction";
import { UpdateProfile } from "redux/actions/UserAction";
import UserService from "services/UserService";
import "./Login.scss";

const { Title, Text } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const [inputStatus, setInputStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    setInputStatus(null);
    let resp = await signInWithEmail(email, password);
    setLoading(false);
    if (!resp.success) {
      console.log("resp error", resp.error.length);
      if (resp.error.includes("auth/wrong-password")) {
        message.error("Invalid username or password");
        setInputStatus("error");
      }
      return;
    }
    const user = resp.user;
    console.log("user", user);
    console.log("setting local uid", user.user.uid);
    localStorage.setItem("uid", user.user.uid);
    resp = await UserService.getMyProfile();
    if (resp.success) {
      console.log("my profile response", resp.data);
      dispatch(LogIn(resp.data.fbUser));
      dispatch(UpdateProfile(resp.data.profile));
    }
    form.resetFields();
    navigate("/dashboard");
  };

  const googleLoginHandler = async () => {
    console.log("google login");
    let user = await signUpWithGoogle();
    if (user) {
      console.log("setting local uid", user.user.uid);
      localStorage.setItem("uid", user.user.uid);
      let resp = await UserService.getMyProfile();
      if (resp.success) {
        console.log("my profile response", resp.data);
        dispatch(LogIn(resp.data.fbUser));
        dispatch(UpdateProfile(resp.data.profile));
      }
      navigate("/dashboard");
    }
  };
  return (
    <Space align="center" direction="vertical" style={{ width: "100%" }}>
      <Layout style={{ width: "360px", backgroundColor: "white" }}>
        <Space direction="vertical">
          <Row
            justify="center"
            align="middle"
            style={{
              fontFamily: "Ubuntu",
              color: "#0057ad",
              fontWeight: 700,
              padding: "24px",
              fontSize: "22px",
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
              maxWidth: "100%",
            }}
          >
            <div>
              <span style={{ color: "black" }}>ZERO</span>
            </div>
          </Row>
          <Space size="large" />
          <Space size="large" />
          <Space size="large" />
          <Title level={2} style={{ textAlign: "center" }}>
            Welcome back
          </Title>
          <Row>
            <Col span={24}>
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                  loginHandler(values);
                }}
                disabled={loading}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid Email!",
                    },
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    status={inputStatus}
                    size="large"
                    placeholder="Enter email"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    status={inputStatus}
                    size="large"
                    placeholder="Enter password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                  >
                    Continue
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          {/* <Input
          required={true}
          value={email}
          setValue={setEmail}
          label="Email"
          placeholder="Type your email!"
          regEx={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
          errorMessage="Incorrect email format!"
          marginBottom="1rem"
        /> */}

          {/* <PasswordInput
        value={password}
        setValue={setPassword}
        marginBottom="2rem"
      /> */}
          <Row align="middle" justify="center">
            <Col>
              Don't have an account?{" "}
              <span>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign Up
                </Button>
              </span>
            </Col>
          </Row>
          <Divider plain>OR</Divider>
          <Button
            size="large"
            block
            onClick={googleLoginHandler}
            icon={<GoogleOutlined />}
          >
            Continue in with Google
          </Button>
        </Space>
      </Layout>
    </Space>
  );
}

export default Login;
