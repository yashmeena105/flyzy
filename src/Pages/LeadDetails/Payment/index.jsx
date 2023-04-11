import React from "react";
import { Space, Tabs } from "antd";
import Customer from "./Customer";
import Vendor from "./Vendor";
import Pricing from "./Pricing";

const Payment = () => {
  const tabs = [
    {
      label: "Cost & Pricing",
      key: "pricing",
      children: <Pricing />,
    },
    {
      label: "Customer Payments",
      key: "payments",
      children: <Customer />,
    },
    // {
    //   label: "Vendor Payments",
    //   key: "vendors",
    //   children: <Vendor />,
    // },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Tabs tabPosition={"top"} type="card" items={tabs} addIcon />
    </Space>
  );
};

export default Payment;
