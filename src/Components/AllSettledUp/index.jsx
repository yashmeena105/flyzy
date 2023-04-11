import React from "react";
import { Row, Col, Typography } from "antd";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
const { Text, Link, Title } = Typography;

const AllSettledUp = () => {
  return (
    <Row
      align={"middle"}
      style={{
        border: "1px dashed #2e7d32",
        padding: "6px 12px",
        borderRadius: "6px",
      }}
    >
      <Text
        style={{
          color: "#2e7d32",
          fontWeight: "bold",
        }}
      >
        {"All Settled Up"}
      </Text>
      <WhatshotOutlinedIcon color="success" />
    </Row>
  );
};

export default AllSettledUp;
