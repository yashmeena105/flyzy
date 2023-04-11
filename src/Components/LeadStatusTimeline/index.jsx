import React, { useState } from "react";
import { Steps, Row, Col } from "antd";

const LeadStatusTimeline = ({ leadData }) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [advancePaymentPercentage, setAdvancePaymentPercentage] = useState(90);
  const [finalPaymentPercentage, setFinalPaymentPercentage] = useState(30);
  const [vendorPaymentPercentage, setVendorPaymentPercentage] = useState(0);

  const statusItems = [
    {
      title: "New",
      status: "finish",
    },
    {
      title: "Proposal Sent",
      description: "₹ 45,000",
      status: "wait",
    },
    {
      title: "Trip Confirmed",
      description: "4 nights",
      status: "wait",
    },
    {
      title: "Advance",
      description: "₹ 30k/45k",
      status: "wait",
    },
    {
      title: "Ongoing Trip",
      description: "Jan 4 - Jan 12",
      status: "wait",
    },
  ];
  const finalPaymentStepItem = [
    {
      title: "Customer Pay",
      description: "₹ 35k/90k",
      status: "process",
    },
  ];

  const vendorPaymentStepItem = [
    {
      title: "Vendor Pay",
      description: "₹ 0/80k",
      status: "process",
    },
  ];
  return (
    <Row>
      <Col flex={"auto"}>
        <Steps
          style={{ padding: "12px", paddingBottom: 0 }}
          labelPlacement="vertical"
          direction="horizontal"
          size="small"
          current={currentStatus}
          percent={advancePaymentPercentage}
          items={statusItems}
        />
      </Col>
      <Col>
        <Steps
          style={{ padding: "12px", paddingBottom: 0 }}
          labelPlacement="vertical"
          direction="horizontal"
          size="small"
          current={0}
          percent={finalPaymentPercentage}
          items={finalPaymentStepItem}
        />
      </Col>
      <Col>
        <Steps
          style={{ padding: "12px", paddingBottom: 0 }}
          labelPlacement="vertical"
          size="small"
          current={0}
          percent={vendorPaymentPercentage}
          items={vendorPaymentStepItem}
        />
      </Col>
    </Row>
  );
};

export default LeadStatusTimeline;
