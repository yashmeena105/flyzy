import {
  Row,
  Col,
  Space,
  Typography,
  Card,
  Tag,
  Image,
  Button,
  Dropdown,
  Modal,
} from "antd";
import PaxCount from "Components/PaxCount";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquareOutlined } from "@ant-design/icons";
import { noimage } from "utils/constants";
import { LikeOutlined, MoreOutlined, SmileOutlined } from "@ant-design/icons";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import dayjs from "dayjs";
import ItineraryDetails from "./ItineraryDetails";
const { Text, Title } = Typography;

const items = ({ onEdit, onDelete }) => [
  {
    label: <a onClick={onEdit}>Edit</a>,
    key: "Edit",
  },
  {
    label: <a onClick={onDelete}>Delete</a>,
    danger: true,
    key: "Delete",
  },
];

const ItineraryRow = ({
  data,
  importable = false,
  onImport,
  confirmItinerary,
}) => {
  const navigate = useNavigate();
  const [itineraryPreviewModalOpen, setItineraryPreviewModalOpen] =
    useState(false);

  const onEdit = (e) => {
    e.stopPropagation();
    console.log("onEdit");
  };

  const onDelete = (e) => {
    e.stopPropagation();
    console.log("onDelete");
  };

  return (
    <>
      <Modal
        width={"90vw"}
        open={itineraryPreviewModalOpen}
        onCancel={() => {
          setItineraryPreviewModalOpen(false);
        }}
      >
        <ItineraryDetails itid={data?.id} mini={true} />
      </Modal>
      <Row>
        <Col flex="auto">
          <Card
            title={
              <Row gutter={12}>
                <Col>{data.name}</Col>-
                <Col>
                  <div style={{ fontWeight: "normal" }}>
                    {data?.days?.length} Nights{" "}
                    {data?.start_date_utc
                      ? "starting" + dayjs(data.start_date_utc).format("D MMM")
                      : ""}
                  </div>
                </Col>
              </Row>
            }
            size="small"
            style={{
              width: "100%",
              backgroundColor: data?.is_confirmed ? "#e3f7e3" : null,
              borderBottom: data?.is_confirmed ? "1px solid #bddcbf" : null,
            }}
            hoverable
            onClick={() => {
              navigate(`/itinerary/${data.id}`);
            }}
            extra={
              <Row gutter={6} align="middle">
                {data?.lead_id && !data.is_confirmed && (
                  <Col>
                    <Button
                      icon={<LikeOutlined />}
                      type="link"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmItinerary(data.id);
                      }}
                    >
                      Confirm Itinerary
                    </Button>
                  </Col>
                )}
                {data?.lead_id && data.is_confirmed && (
                  <Col>
                    <Button
                      disabled
                      type="link"
                      style={{ color: "green", fontWeight: "bold" }}
                    >
                      <Row align="stretch" gutter={6}>
                        <Col>Confirmed</Col>
                        <Col>
                          <DoneAllIcon />
                        </Col>
                      </Row>
                    </Button>
                  </Col>
                )}
                {importable && (
                  <Col>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setItineraryPreviewModalOpen(true);
                      }}
                    >
                      Preview
                    </Button>
                  </Col>
                )}
                {importable && (
                  <Col>
                    <Button
                      size="small"
                      type="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onImport({ data });
                      }}
                    >
                      Import
                    </Button>
                  </Col>
                )}
                <Col>
                  <Dropdown
                    menu={{ items: items({ onEdit, onDelete }) }}
                    trigger={["click"]}
                  >
                    <Button
                      type="text"
                      icon={<MoreOutlined />}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    ></Button>
                  </Dropdown>
                </Col>
              </Row>
            }
          >
            <Row gutter={[36, 6]} align="middle">
              <Col>
                <Text style={{ fontSize: "12px" }}>#{data.id}</Text>
              </Col>
              <Col>
                <Text strong>
                  {"₹"}
                  {data.type == "TEMPLATE" ? (
                    data?.price_per_person + " /pax"
                  ) : (
                    <>
                      {data?.price ?? "--"}
                      <span></span>
                    </>
                  )}
                </Text>
              </Col>
              <Col>
                <Image
                  src={data?.cover_image_url}
                  fallback={noimage}
                  width="80px"
                />
              </Col>
              <Col>
                {data?.is_published ? (
                  <>
                    <CheckSquareOutlined /> <span>Listed on Marketplace</span>
                  </>
                ) : (
                  <>No yet listed</>
                )}{" "}
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col>
                <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Created At:{" "}
                  {dayjs(data.created_utc_timestamp).format("D-MMM-YY h:mma")}
                </Text>
              </Col>
              <Col></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ItineraryRow;
