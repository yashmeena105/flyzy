import {
  Row,
  Col,
  Space,
  Typography,
  Card,
  Tag,
  Image,
  Button,
  Modal,
  InputNumber,
  Input,
  Badge,
  DatePicker,
  Avatar,
  Popover,
  Divider,
} from "antd";
import {
  getInitials,
  getPriceRange,
  getRandomColor,
  summarizeDestinations,
  toProperCase,
} from "utils/stringFunctions";
import PaxCount from "Components/PaxCount";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { noimage } from "utils/constants";
import {
  StarFilled,
  CheckCircleOutlined,
  MessageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import TransportDetails from "./TransportDetails";
const { Text, Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const TransportRow = ({ data, importable = false, onImport, location }) => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [notes, setNotes] = useState(null);

  const inputNumberRef = useRef(null);

  useEffect(() => {
    setSelectedPackages(
      (data?.packages ?? []).map((r) => {
        return { ...r, quantity: 0 };
      })
    );
  }, [data]);
  const showImportBtn = () => {
    switch (location) {
      case "MARKETPLACE":
        console.log("MKP", data?.company_id._id != profile?.company_id._id);
        return data?.company_id._id != profile?.company_id._id;
      case "ITINERARY":
        console.log("ITIN");
        return true;
      case "MASTER":
        return false;
      default:
        return false;
    }
  };

  const image = data?.images?.length > 0 ? data?.images[0] : noimage;

  const content = (
    <>
      <Modal
        open={previewModalOpen}
        onCancel={() => {
          setPreviewModalOpen(false);
        }}
        width="90vw"
        title=" "
        footer={null}
      >
        <TransportDetails actid={data.id} readonly={true} />
      </Modal>
      <Row
        wrap={false}
        style={{
          borderRadius: "10px",
          border: "1px solid #f0f0f0",
          padding: "6px",
          minHeight: "80px",
          background: "white",
          boxShadow: "0px 1px 2px 2px rgba(0, 0, 0, 0.03)",
          cursor:
            data?.company_id._id == profile?.company_id._id ? "pointer" : null,
        }}
      >
        <Col flex={"auto"}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => {
              if (data?.company_id._id == profile?.company_id._id)
                navigate(`/transport/${data.id}`);
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={image}
                style={{
                  width: "160px",
                  height: "120px",
                  objectFit: "cover",
                  position: "relative",
                  borderRadius: "6px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignPackages: "flex-start",
                  paddingLeft: "10px",
                }}
              >
                <Text style={{ fontSize: "10px", color: "gray" }}>
                  {(data?.stars ?? 0) > 0 ? `${data.stars}-star ` : ""}{" "}
                  {`${data.destination.label}`}
                </Text>
                <Text style={{ fontSize: "14px" }}>{data.name}</Text>
                <span style={{ fontSize: "12px" }}>
                  <StarFilled style={{ color: "#FFBF00" }} />
                  -- <span style={{ color: "gray" }}>{`(0 reviews)`}</span>
                </span>
                <Text style={{ fontSize: "16px", marginTop: "10px" }}>
                  {getPriceRange(data.packages)}
                </Text>
              </div>
            </div>

            {importable ? (
              <Popover
                title={
                  <Row justify="space-between" align="middle">
                    <Col>{data.company_id.brand_name}</Col>
                    <Col>
                      <Avatar
                        src={data.company_id?.logo?.logo_url}
                        style={{
                          backgroundColor: data.company_id?.logo?.color ?? null,
                        }}
                      >
                        {getInitials(data.company_id.brand_name)}
                      </Avatar>
                    </Col>
                  </Row>
                }
                content={
                  <div>
                    <span style={{ fontSize: "12px" }}>
                      <span
                        style={{
                          fontSize: "8px",
                          color: "white",
                          backgroundColor: "#0057ad",
                          // border: "0.5px solid #0057ad",
                          borderRadius: "2px",
                          padding: "3px 6px",
                          marginRight: "6px",
                        }}
                      >
                        Flyzy Verified <CheckCircleOutlined />
                      </span>
                      <StarFilled style={{ color: "#FFBF00" }} />
                      --{" "}
                      <span
                        style={{
                          color: "gray",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >{`(0 reviews)`}</span>
                    </span>
                    <Divider plain></Divider>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        textAlign: "center",
                      }}
                    >
                      No reviews yet
                    </div>
                  </div>
                }
              >
                <div
                  style={{ display: "flex", gap: "6px", paddingRight: "10px" }}
                >
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignPackages: "end",
                      textAlign: "right",
                    }}
                  >
                    <Text style={{ fontSize: "10px", color: "gray" }}>
                      Listing by:
                    </Text>
                    <Text style={{ fontSize: "12px" }}>
                      {data.company_id.brand_name}
                    </Text>
                    <span style={{ fontSize: "10px", paddingTop: "6px" }}>
                      <span
                        style={{
                          fontSize: "8px",
                          color: "white",
                          backgroundColor: "#0057ad",
                          // border: "0.5px solid #0057ad",
                          borderRadius: "2px",
                          padding: "3px 6px",
                          marginRight: "6px",
                        }}
                      >
                        Flyzy Verified <CheckCircleOutlined />
                      </span>
                      <StarFilled style={{ color: "#FFBF00" }} />
                      --
                    </span>
                  </div>
                  <Avatar
                    src={data.company_id?.logo?.logo_url}
                    style={{
                      backgroundColor: data.company_id?.logo?.color ?? null,
                    }}
                  >
                    {getInitials(data.company_id.brand_name)}
                  </Avatar>
                </div>
              </Popover>
            ) : data?.is_published ? (
              <Tag color="success" style={{ height: "fit-content" }}>
                Open for sale
              </Tag>
            ) : (
              <Tag color="warning" style={{ height: "fit-content" }}>
                Closed for sale
              </Tag>
            )}
          </div>
        </Col>
        {importable && (
          <div>
            <Col
              style={{
                display: "flex",
                height: "100%",
                alignPackages: "end",
                justifyContent: "flex-end",
                flexDirection: "column",
              }}
            >
              <Row>
                <Button
                  style={{ width: "100px" }}
                  onClick={() => {
                    setPreviewModalOpen(true);
                  }}
                  type="dashed"
                >
                  <Row justify={"space-between"} align="center">
                    <>
                      <Col>Preview</Col>
                      <Col>
                        <EyeOutlined />
                      </Col>
                    </>
                  </Row>
                </Button>
              </Row>
              {showImportBtn() && (
                <>
                  <div style={{ height: "6px" }} />
                  <Row>
                    <Button
                      // type="dashed"
                      style={{ width: "100px" }}
                      onClick={() => {
                        setQuantityModalOpen(true);
                      }}
                    >
                      <Row justify={"space-between"} align="center">
                        {location == "MARKETPLACE" ? (
                          <>
                            <Col>Inquire</Col>
                            <Col>
                              <MessageOutlined style={{ fontSize: "12px" }} />
                            </Col>
                          </>
                        ) : (
                          "Import"
                        )}
                      </Row>
                    </Button>
                  </Row>
                </>
              )}
            </Col>
            <Modal
              open={quantityModalOpen}
              onCancel={() => {
                setSelectedPackages([]);
                setQuantityModalOpen(false);
              }}
              onOk={() => {
                console.log(selectedPackages);
                data.items_selected = selectedPackages;
                data.notes = notes;
                try {
                  data.start_date_utc = new Date(
                    selectedDates[0]
                  )?.toISOString();
                  data.end_date_utc = new Date(selectedDates[1])?.toISOString();
                  data.no_of_days = selectedDates[1].diff(
                    selectedDates[0],
                    "day"
                  );
                } catch (error) {}
                setQuantityModalOpen(false);
                onImport({ type: "TRANSPORT", data });
              }}
              title="Select Packages"
            >
              <Space
                size="small"
                direction="vertical"
                style={{ width: "100%" }}
              >
                {data.packages.map((room, j) => {
                  return (
                    <Card
                      key={j}
                      title={room.name}
                      size="small"
                      extra={
                        <Input.Group compact>
                          {/* <Button size="small">-</Button> */}
                          <InputNumber
                            ref={inputNumberRef}
                            style={{ width: "50px" }}
                            min={0}
                            max={100}
                            size="small"
                            defaultValue={0}
                            onChange={(e) => {
                              let newRoomData = [...selectedPackages];
                              newRoomData[j].quantity = e;
                              console.log("newRoomData", newRoomData);
                              setSelectedPackages(newRoomData);
                            }}
                          />
                          {/* <Button size="small">+</Button> */}
                        </Input.Group>
                      }
                    >
                      <Row>
                        <Text>{room.inclusions}</Text>
                      </Row>
                      <Row justify="end">
                        <Col>
                          {room?.is_negotiable == true ? (
                            <Tag color="green">Negotiable price</Tag>
                          ) : (
                            <Tag color="orange">Non-Negotiable price</Tag>
                          )}{" "}
                          ₹{room.price}
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
                <Card size="small">
                  <Row justify="space-between">
                    <Col>
                      <Text strong>Total: </Text>
                    </Col>
                    <Col>
                      <Text strong>
                        ₹
                        {selectedPackages.reduce(function (sum, room) {
                          return sum + room.price * room?.quantity ?? 0;
                        }, 0)}
                      </Text>
                    </Col>
                  </Row>
                </Card>
                <Card size="small">
                  {location == "MARKETPLACE" && (
                    <>
                      <Row style={{ paddingBottom: "12px" }}>
                        <Text strong>Dates:</Text>
                      </Row>
                      <Row>
                        <RangePicker
                          onChange={(val) => {
                            setSelectedDates(val);
                          }}
                        ></RangePicker>
                      </Row>
                    </>
                  )}
                  <Row style={{ paddingBottom: "12px", marginTop: "16px" }}>
                    <Text strong>Notes:</Text>
                  </Row>
                  <Row>
                    <TextArea
                      onChange={(val) => {
                        setNotes(val);
                      }}
                      placeholder="Any special requests"
                    ></TextArea>
                  </Row>
                </Card>
              </Space>
            </Modal>
          </div>
        )}
      </Row>
    </>
  );
  return content;
};

export default TransportRow;
