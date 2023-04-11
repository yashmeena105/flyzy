import { Col, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import LeadService from "services/LeadService";
import ChatRoom from "./ChatRoom";

const AppChatsPublic = () => {
  const [loading, setLoading] = useState(true);
  const [customerRoom, setCustomerRoom] = useState(null);

  const user = {
    uid: "FrNERorG6CXs4ESci3B6fBXD71v1",
    name: "Pradeep",
  };

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getAppChatRoom();
    if (resp.success) {
      let room = resp.data;
      setCustomerRoom(room);
    } else {
      message.error(resp.error);
    }
    setCustomerRoom({
      _id: "63f97be2fe1461ff3192379f",
      is_deleted: false,
      is_active: true,
      lead_id: "217868",
      og_lead_id: "292643",
      company_id: {
        primary_contact: {
          name: "Hansraj Patel",
          email: "hansraj@flyzygo.com",
          phone_number: null,
        },
        _id: "63f843502cc902a5491c7fbe",
        type: "CORPORATE",
        brand_name: "XYZ",
        active: true,
        is_deleted: false,
        author_id: "63f843502cc902a5491c7fbd",
        created_utc_timestamp: "2023-02-24T04:55:01.049Z",
        __v: 0,
        business_name: "RPM",
      },
      og_company: {
        primary_contact: {
          name: "Hansraj Patel",
          email: "hansrajjdh2016@gmail.com",
          phone_number: null,
        },
        _id: "63f8ce1d4ab16ffdaceacf0e",
        type: "CORPORATE",
        brand_name: "Hansraj Patel's org",
        active: true,
        is_deleted: false,
        author_id: "63f8ce1d4ab16ffdaceacf0d",
        created_utc_timestamp: "2023-02-24T13:08:42.958Z",
        __v: 0,
      },
      created_utc_timestamp: "2023-02-25T03:07:07.444Z",
      __v: 0,
      read_timestamps: {
        "63f843502cc902a5491c7fbd": "2023-02-26T07:34:31.111Z",
      },
    });
    setLoading(false);
  };
  return (
    <Row justify={"center"}>
      <Spin spinning={loading}>
        <Col
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatRoom room={customerRoom} user={user} parentHeight="100vh" />
        </Col>
      </Spin>
    </Row>
  );
};

export default AppChatsPublic;
