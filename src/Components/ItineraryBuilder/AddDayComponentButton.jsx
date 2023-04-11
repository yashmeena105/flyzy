import React from "react";
import Add from "@mui/icons-material/Add";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";

const { Text } = Typography;

const AddDayComponent = ({ loading = false, onClick }) => {
  return (
    <Button
      loading={loading}
      type="dashed"
      icon={<PlusOutlined />}
      style={{ height: "100%", width: "90px" }}
      onClick={onClick}
    >
      <Row justify={"center"} align="center">
        Add Item
      </Row>
    </Button>
  );
};

export default AddDayComponent;
