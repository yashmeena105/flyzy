import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMessages } from "Hooks/useMessages";
import "./styles.css";
import { Button, Col, Empty, message, Row, Space, Typography } from "antd";
import dayjs from "dayjs";

import { markRoomAsRead } from "services/ChatService";

import useSound from "use-sound";
import notificationTone from "Assets/tones/notification.mp3";
import { openInNewTab } from "utils/misc";
import { messageTypes } from "utils/constants";

const { Text } = Typography;

function MessageList({ roomId, user }) {
  const latedMsgRef = React.useRef(null);
  const messages = useMessages(roomId);

  const scrollToLatestMessage = async () => {
    latedMsgRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToLatestMessage();
    playNotificationTone();
    if (messages.length)
      markRoomAsRead(roomId, messages[messages.length - 1]?.timestamp);
  }, [messages.length]);

  const [playNotificationTone] = useSound(notificationTone);

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      {(messages ?? []).length > 0 ? (
        messages.map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
        ))
      ) : (
        <Row justify="center" style={{ paddingTop: "20px" }}>
          <Empty description="No messages yet" />
        </Row>
      )}
      <div ref={latedMsgRef}></div>
    </Space>
  );
}

function Message({ message, isOwnMessage }) {
  const { displayName, text, timestamp, type = messageTypes.DEFAULT } = message;
  let ts = dayjs(timestamp).format("D/MM h:mm a");
  return (
    <>
      <Row justify={isOwnMessage ? "end" : "start"}>
        <Col
          style={{
            borderRadius: "6px",
            border: isOwnMessage
              ? "1px solid lightblue"
              : "1px solid lightgray",
            borderRight: isOwnMessage
              ? "3px solid lightblue"
              : "1px solid lightgray",
            borderLeft: isOwnMessage
              ? "1px solid lightblue"
              : "3px solid lightgray",
          }}
        >
          {type == messageTypes.DEFAULT ? (
            <div
              style={{
                padding: "12px",
              }}
            >
              <div
                style={{
                  textAlign: isOwnMessage ? "end" : "left",
                  fontWeight: "bold",
                  fontSize: "10px",
                }}
              >
                {isOwnMessage ? "You" : displayName} •{" "}
                <span style={{ fontWeight: "lighter" }}> {ts}</span>
              </div>
              <div>{text}</div>
              {message.link && (
                <Row gutter={6} style={{ marginTop: "6px" }}>
                  <Col>
                    <Button type="primary" href={message.link} target="_blank">
                      Tap to View
                    </Button>
                  </Col>
                  {message.type == "PROPOSAL" && (
                    <>
                      <Col>
                        <Button>
                          {isOwnMessage ? "Mark as Final" : "Accept"}
                        </Button>
                      </Col>
                      {!isOwnMessage && (
                        <Col>
                          <Button danger>Reject</Button>
                        </Col>
                      )}
                    </>
                  )}
                </Row>
              )}
            </div>
          ) : (
            <div>queryComponent</div>
          )}
        </Col>
      </Row>
    </>
  );
}

export { MessageList };
