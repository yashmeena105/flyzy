import {
  Button,
  Col,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ItineraryExplore from "./ItineraryExplore";
import ItineraryService from "services/ItineraryService";
import { useParams } from "react-router-dom";
import ItineraryRow from "Pages/Master/ItineraryRow";
import { height } from "@mui/system";
import { leadData } from "../data";
import ItineraryBuilder from "Components/ItineraryBuilder/ItineraryBuilder";
import ItineraryDetails from "Pages/Master/ItineraryDetails";

const { Text } = Typography;

const LeadItineraries = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [noCurrentItineraries, setNoCurrentItineraries] = useState(false);
  const [addNewItinerary, setAddNewItinerary] = useState(false);
  const [leadItineraries, setLeadItineraries] = useState([]);
  const [addItineraryPromptCount, setAddItineraryPromptCount] = useState(0);

  let promptCount = 0;

  const refresh = async () => {
    setLoading(true);
    let resp = await ItineraryService.getItineraries({
      source: "LEAD",
      lead_id: id,
    });
    console.log("lead itineraries response", resp);
    if (resp.success) {
      setLeadItineraries(resp.data);
      if (resp.data?.length == 0) {
        if (addItineraryPromptCount == 0) {
          setAddNewItinerary(true);
          setAddItineraryPromptCount(setAddItineraryPromptCount + 1);
        }
        setNoCurrentItineraries(true);
        console.log(promptCount);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, []);

  const createFreshItinerary = async () => {
    setAddNewItinerary(false);
    setLoading(true);
    let resp = await ItineraryService.addLeadItinerary({ leadId: id });
    if (!resp.success) message.error(resp.error);
    setLoading(false);
    refresh();
    window.location.reload();
  };

  const confirmItinerary = async (id) => {
    setLoading(true);
    let resp = await ItineraryService.confirmItinerary(id);
    if (resp.success) {
      message.success(`Confirmed ${resp.data.data.name}`);
    } else {
      message.error(resp.error);
    }
    refresh();
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "12px",
        paddingBottom: "30px",
      }}
    >
      {!noCurrentItineraries && (
        <>
          <Row justify="space-between">
            <Col>
              <Text style={{ fontSize: "18px" }} strong>
                Current Itinerar{leadItineraries.length > 1 ? "ies" : "y"}
              </Text>
            </Col>
            <Col>
              <Row gutter={[12, 6]}>
                <Col>
                  {!addNewItinerary && (
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setAddNewItinerary(true);
                      }}
                    >
                      New Itinerary
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Spin spinning={loading}>
            {leadItineraries.length == 1 ? (
              <ItineraryDetails itid={leadItineraries[0].id} mini={true} />
            ) : (
              <Space direction="vertical" style={{ width: "100%" }}>
                {leadItineraries.map((i, j) => (
                  <ItineraryRow
                    key={j}
                    data={i}
                    confirmItinerary={confirmItinerary}
                  />
                ))}
              </Space>
            )}
          </Spin>
        </>
      )}
      {addNewItinerary && (
        <Modal
          title={`New Itinerary `}
          open={addNewItinerary}
          width="90vw"
          height="90vh"
          onCancel={() => {
            setAddNewItinerary(false);
            refresh();
          }}
        >
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Button
                type="dashed"
                disabled
                style={{ width: "100%", height: "80px", cursor: "default" }}
              >
                <Row justify="center" align="middle">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      createFreshItinerary();
                    }}
                  >
                    Create a fresh itinerary
                  </Button>
                </Row>
              </Button>
            </Col>
          </Row>
          <Row gutter={[12, 6]} justify={"center"}>
            OR
          </Row>

          <ItineraryExplore
            browsing
            onImport={({ data }) => {
              console.log("imported", data);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default LeadItineraries;
