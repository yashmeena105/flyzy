import "./styles.css";
import { Button, Col, Input, Row, Avatar, Typography, Result } from "antd";
import React, { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { sendMessage } from "services/ChatService";
import { MessageList } from "./MessageList";
import TextArea from "antd/es/input/TextArea";
import { getInitials, getRandomColor } from "utils/stringFunctions";
import useSound from "use-sound";
import sentTone from "Assets/tones/sent.mp3";
import NotificationService from "services/NotificationService";

const { Text, Title } = Typography;

const ChatRoom = ({ room, user, type, parentHeight }) => {
  const [inputText, setInputText] = useState("");

  const [playSentTone] = useSound(sentTone);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    sendMessage(room._id, user.uid, user?.name, inputText);
    await NotificationService.sendNotification({
      company_id: getCustomerId(),
      message: {
        notification: {
          title: "New message - " + user?.name,
          body: inputText,
        },
        data: {
          roomId: room._id,
          lead_id: room.lead_id,
        },
      },
    });
    setInputText("");
    playSentTone();
  };

  const getCustomerName = () => {
    if (room?.og_customer != null) {
      return room.og_customer.customer_name;
    }
    if (type == "VENDOR") {
      return room.company_id.brand_name;
    }
    return room.og_company.brand_name;
  };

  const getCustomerId = () => {
    if (room?.og_customer != null) {
      return room.og_customer.customer_name;
    }
    if (type == "VENDOR") {
      return room.company_id._id;
    }
    return room.og_company._id;
  };

  return room != null ? (
    <div
      style={{
        height: parentHeight ?? "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {type != "VENDOR" && (
        <div
          style={{
            borderBottom: "1px solid lightgray",
            padding: "12px 6px",
          }}
        >
          <Row gutter={12} align="middle">
            <Col>
              <Avatar
                size="small"
                src={null}
                style={{ backgroundColor: getRandomColor() }}
              >
                {getInitials(getCustomerName())}
              </Avatar>
            </Col>
            <Col>
              <Text strong>{getCustomerName()}</Text>
            </Col>
          </Row>
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <MessageList roomId={room._id} user={user} />
      </div>
      <Row>
        <Col flex="auto" style={{ padding: "6px 20px 20px 20px" }}>
          <Input.Group compact style={{ width: "100%" }}>
            <TextArea
              rows={1}
              value={inputText}
              onChange={handleChange}
              size="large"
              placeholder="Type your message..."
              style={{
                width: "calc(100% - 60px)",
              }}
              onPressEnter={inputText.trim().length > 0 ? handleSubmit : null}
            />
            <Button
              disabled={inputText.trim().length < 1}
              onClick={handleSubmit}
              size="large"
              style={{
                width: "60px",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              icon={<SendOutlined />}
            ></Button>
          </Input.Group>
        </Col>
      </Row>
    </div>
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
};

export default ChatRoom;
