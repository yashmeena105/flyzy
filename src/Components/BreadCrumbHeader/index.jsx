import { Avatar, Breadcrumb, Col, Row } from "antd";
import React from "react";
import {
  HomeOutlined,
  GroupOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getInitials } from "utils/stringFunctions";
import { useSelector } from "react-redux";

const BreadCrumbHeader = ({ config = { name: "" } }) => {
  const { profile } = useSelector((state) => state.profile);
  let usr = profile?.user_info;
  return (
    <Row
      gutter={[12, 6]}
      style={{
        padding: "12px",
        position: "sticky",
        top: "0px",
        backgroundColor: "white",
        zIndex: 1,
      }}
      align={"middle"}
    >
      <Col flex={"auto"}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <GroupOutlined />
            <span>{config.name}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
  );
};

export default BreadCrumbHeader;
