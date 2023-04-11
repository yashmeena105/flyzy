import {
  Divider,
  Row,
  Space,
  Tag,
  Timeline,
  Watermark,
  Typography,
} from "antd";
import React from "react";
import ComponentPreview from "./ComponentPreview";
import {
  ShareAltOutlined,
  FilePdfOutlined,
  CalendarOutlined,
  WhatsAppOutlined,
  AndroidFilled,
  AppleFilled,
  LinkOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const PreviewProposal = ({ data, readonly }) => {
  return (
    <Watermark
      height={30}
      width={130}
      gap={[140, 140]}
      content={data?.watermark_text}
    >
      <Space
        style={{
          width: "100%",
          padding: "0 12px",
          border: "1px solid gold",
          borderRadius: "6px",
        }}
        direction="vertical"
      >
        <Title level={4} style={{ textAlign: "center", fontWeight: "normal" }}>
          {data?.name + " - " + data?.dayOrder?.length + "N" ?? "--"}
        </Title>
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          {"Price: "}&#x20B9;
          {data?.price}{" "}
          {data?.discount > 0 && (
            <span
              style={{
                textDecoration: "line-through",
                color: "grey",
                fontSize: "14px",
              }}
            >
              &#x20B9;
              {data?.price + data?.discount}
            </span>
          )}
        </div>
        {data?.dayOrder &&
          data?.days &&
          data.dayOrder.map((dayId, j) => {
            return (
              <div key={j}>
                <Divider orientation="left">
                  <Space>
                    <Text strong>{`Day ${j + 1}`}</Text>
                    <Tag icon={<CalendarOutlined />}>
                      {dayjs(data?.info?.start_date_utc)
                        .add(j, "day")
                        .format("ddd D MMM YY")}
                    </Tag>
                  </Space>
                </Divider>
                <Row justify="center">
                  <Timeline mode="left" style={{ width: "400px" }}>
                    {data.days[dayId].componentIds.map((componentId, k) => {
                      return data.dayComponents[componentId]?.is_deleted ? (
                        <></>
                      ) : (
                        <Timeline.Item key={k}>
                          <Space direction="vertical" style={{ width: "100%" }}>
                            {}
                            <ComponentPreview
                              data={data.dayComponents[componentId]}
                              readonly={readonly}
                            />
                          </Space>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                </Row>
              </div>
            );
          })}
      </Space>
    </Watermark>
  );
};

export default PreviewProposal;
