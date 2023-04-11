import {
  Col,
  Form,
  Row,
  Space,
  Button,
  Typography,
  Divider,
  Layout,
  message,
  Input,
} from "antd";
import {
  signUpWithEmailAndPassword,
  signUpWithFacebook,
  signUpWithGoogle,
} from "Hooks/authentication";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogIn } from "redux/actions/LoginAction";
import "./Register.scss";
import { GoogleOutlined } from "@ant-design/icons";
import UserService from "services/UserService";
import { UpdateProfile } from "redux/actions/UserAction";

const { Title, Text } = Typography;

function Register() {
  const [loading, setLoading] = useState(false);
  const [inputStatus, setInputStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const registerHandler = async ({ email, password }) => {
    setLoading(true);
    let resp = await signUpWithEmailAndPassword(email, password);
    setLoading(false);

    if (resp.success) {
      let user = resp.user;
      localStorage.setItem("uid", user.user.uid);
      let resp = await UserService.getMyProfile();
      if (resp.success) {
        console.log("my profile response", resp.data);
        dispatch(LogIn(resp.data.fbUser));
        dispatch(UpdateProfile(resp.data.profile));
      }
      form.resetFields();
      navigate("/dashboard");
    } else if (!resp.success && resp.code == "EMAIL_EXISTS") {
      message.error(resp.error);
      navigate("/login");
    } else {
      message.error(resp.error);
    }
  };

  const googleRegisterHandler = async () => {
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

  const facebookRegisterHandler = async () => {
    console.log("facebook login");
    signUpWithFacebook();
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
            Welcome
          </Title>
          <Row>
            <Col span={24}>
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                  registerHandler(values);
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
          <Row align="middle" justify="center">
            <Col>
              Already have an account?{" "}
              <span>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log In
                </Button>
              </span>
            </Col>
          </Row>
          <Divider plain>OR</Divider>
          <Button
            size="large"
            block
            onClick={googleRegisterHandler}
            icon={<GoogleOutlined />}
          >
            Continue in with Google
          </Button>
        </Space>
      </Layout>
    </Space>
    //     <Input
    //       required={true}
    //       value={email}
    //       setValue={setEmail}
    //       label="Email"
    //       placeholder="Type your email!"
    //       regEx={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
    //       errorMessage="Incorrect email format!"
    //       marginBottom="1rem"
    //     />

    //     <PasswordInput
    //       value={password}
    //       setValue={setPassword}
    //       marginBottom="1rem"
    //     />

    //     <ConfirmPasswordInput
    //       actualPassword={password}
    //       value={confirmPassword}
    //       setValue={setConfirmPassword}
    //       marginBottom="2rem"
    //     />

    //     <RegisterButton
    //       name="REGISTER"
    //       onClick={registerHandler}
    //       loading={loading}
    //     />

    //     <h3 className="heading">OR</h3>

    //     <Button
    //       name="Google"
    //       onClick={googleRegisterHandler}
    //       marginBottom="0.5rem"
    //     />
    //     <Button
    //       name="Facebook"
    //       onClick={facebookRegisterHandler}
    //       marginBottom="2rem"
    //     />
    //   </div>
    // </div>
  );
}

export default Register;
