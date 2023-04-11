import { Spa } from "@mui/icons-material";
import { typography } from "@mui/system";
import { Button, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Space direction="vertical" align="center">
        <Title level={4}>
          Welcome to{" "}
          <span
            style={{
              fontFamily: "Ubuntu",
              color: "#0057ad",
              fontWeight: 700,
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          >
            <span style={{ color: "black" }}>ZERO</span>
          </span>
        </Title>
        <Text>Login with your ZERO account to continue</Text>
        <Space />
        <Space>
          <Button
            size="large"
            onClick={() => {
              navigate(`/login`);
            }}
          >
            Log In
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              navigate(`/register`);
            }}
          >
            Register
          </Button>
        </Space>
      </Space>
    </div>
  );
}

export default LandingPage;
