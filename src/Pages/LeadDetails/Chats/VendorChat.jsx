import { Avatar, Col, Empty, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { getInitials, getRandomColor } from "utils/stringFunctions";
import ChatRoom from "./ChatRoom";

const { Text } = Typography;

const VendorChat = ({ chatRooms, user, parentHeight, location }) => {
  const [roomSelected, setRoomSelected] = useState(null);
  const roomsCount = (chatRooms ?? []).length;

  const getEmptyMessages = () => {
    const nochats =
      location == "QUERIES" ? "No queries yet" : "No conversations yet";
    const noselections =
      location == "QUERIES"
        ? "Please select a query"
        : "Please select a conversation";
    return { nochats, noselections };
  };

  return (
    <Row style={{ height: parentHeight }}>
      <Col
        span={6}
        style={{
          borderRight: "1px solid lightgray",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {roomsCount > 0 ? (
          <div style={{ width: "100%" }}>
            {chatRooms.map((room, j) => {
              const selected = room._id == roomSelected?._id;
              return (
                <Row
                  onClick={() => {
                    setRoomSelected(room);
                  }}
                  key={j}
                  gutter={[12, 6]}
                  style={{
                    borderBottom: "1px solid #efefef",
                    margin: "0",
                    minHeight: "60px",
                    color: "1677ff",
                    backgroundColor: selected ? "#e6f4ff" : null,
                    cursor: "pointer",
                    padding: "0 12px",
                  }}
                >
                  <Row
                    gutter={12}
                    align="middle"
                    wrap={false}
                    style={{ padding: "6px 0" }}
                  >
                    <Col>
                      <Avatar
                        size="small"
                        src={null}
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {getInitials(room.company_id.brand_name)}
                      </Avatar>
                    </Col>
                    <Col flex={"auto"}>
                      <Row style={{ marginBottom: "6px" }}>
                        <Text strong ellipsis>
                          {room.company_id.brand_name}
                        </Text>
                      </Row>
                      <Row>
                        <Text ellipsis>{room?.room_description}</Text>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              );
            })}
          </div>
        ) : (
          <div style={{ paddingTop: "20px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={getEmptyMessages().nochats}
            />
          </div>
        )}
      </Col>
      <Col span={18} style={{ height: "100%" }}>
        {roomSelected != null ? (
          <ChatRoom room={roomSelected} user={user} type="VENDOR" />
        ) : (
          <div style={{ paddingTop: "20px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={getEmptyMessages().noselections}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default VendorChat;
