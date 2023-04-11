import {
  Button,
  Col,
  Divider,
  InputNumber,
  message,
  Popover,
  Row,
  Space,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  Watermark,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import ItineraryService from "services/ItineraryService";
import {
  ShareAltOutlined,
  FilePdfOutlined,
  CalendarOutlined,
  WhatsAppOutlined,
  AndroidFilled,
  AppleFilled,
  LinkOutlined,
} from "@ant-design/icons";
import { PDFExport } from "@progress/kendo-react-pdf";
import dayjs from "dayjs";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import { useSelector } from "react-redux";
import PreviewProposal from "Components/PreviewProposal/PreviewProposal";
import { getHostUrl, openInNewTab } from "utils/misc";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const noimage =
  "https://res.cloudinary.com/dk-find-out/image/upload/q_70,c_pad,w_1200,h_630,f_auto/DCTM_Penguin_UK_DK_AL697473_RGB_PNG_namnse.jpg";

const CreateViewProposal = ({ data, cost }) => {
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [proposalData, setProposalData] = useState({});
  const [name, setName] = useState(data?.name);
  const [price, setPrice] = useState(proposalData?.price ?? cost);
  const [proposalUrl, setProposalUrl] = useState(null);

  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.profile);

  const pdfExportComponent = useRef(null);

  const refresh = async () => {
    setLoading(true);
    console.log("calling get Itinerary from proposal");
    let resp = await ItineraryService.getItinerary(data.id);
    if (resp.success) {
      setProposalData(resp.data);
      console.log(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  const saveProposal = async (source = false) => {
    let payload = {
      ...proposalData,
      price,
      discount,
      lead_id: proposalData.info.lead_id,
      name,
    };
    let resp = await ItineraryService.saveProposal(payload);
    if (!resp.success) {
      message.error(resp.error);
    } else {
      message.success("Proposal Generated");
      console.log("proposalData", resp.data);
      let pid = resp.data.proposalDetails._id;
      if (source == "app")
        openInNewTab("/leads/" + proposalData.info.lead_id + "/communications");
      if (source == "wa") {
        const msg =
          "You received a new proposal\n\nCheck it out\n" +
          getHostUrl() +
          "/proposal/" +
          pid;
        const url = encodeURI("https://wa.me/?text=" + msg);
        openInNewTab(url);
      }
    }
  };

  useEffect(() => {
    console.log("useeffect proposal called");
    refresh();
  }, []);

  const pdfHandler = () => {
    if (pdfExportComponent.current) {
      console.log("pdf", pdfExportComponent.current);
      pdfExportComponent.current.save();
    }
  };

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Row>
        <Typography.Title
          editable={{
            onChange: setName,
          }}
          level={4}
          style={{
            margin: 0,
          }}
        >
          {name}
        </Typography.Title>
      </Row>
      <Row gutter={12} align="middle">
        <Col>
          <Row>
            <Text>Cost</Text>
          </Row>
          <Row>
            <InputNumber disabled value={cost} />
          </Row>
        </Col>
        <Col>
          <Row>
            <Text>
              Final Price <span style={{ color: "red" }}>*</span>
            </Text>
          </Row>
          <Row>
            <InputNumber
              min={0}
              value={price}
              onChange={(e) => {
                setPrice(e);
              }}
              placeholder="Enter final price"
            />
          </Row>
        </Col>
        <Col>
          <Row>
            <Text>Discount</Text>
          </Row>
          <Row>
            <InputNumber
              min={0}
              value={discount}
              onChange={(e) => {
                setDiscount(e);
              }}
              placeholder="Enter discount"
            />
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col>
          <Text strong style={{ fontSize: "16px" }}>
            Preview
          </Text>
        </Col>
        <Col>
          <Row gutter={6}>
            <Col>
              <Button icon={<FilePdfOutlined />} onClick={pdfHandler}>
                PDF
              </Button>
            </Col>
            <Col>
              <Button icon={<LinkOutlined />}></Button>
            </Col>
            <Col>
              <Button
                icon={<WhatsAppOutlined />}
                onClick={() => {
                  saveProposal("wa");
                }}
              ></Button>
            </Col>
            <Col>
              <Popover
                title="Share this Itinerary/Proposal with your clients"
                content={
                  <Space size="small" direction="vertical">
                    <div>Recommend your clients use Flyzy Traveler App.</div>
                    <Row gutter={[12, 6]} justify="end">
                      <Col>
                        <AndroidFilled />
                      </Col>
                      <Col>
                        <AppleFilled />
                      </Col>
                    </Row>
                  </Space>
                }
              >
                <Button
                  style={{ padding: "4px 8px 4px 4px" }}
                  type="primary"
                  onClick={() => {
                    saveProposal("app");
                  }}
                >
                  <Row gutter={6}>
                    <Col>
                      <AppShortcutOutlinedIcon fontSize="small" />
                    </Col>
                    <Col>Share Directly</Col>
                  </Row>
                </Button>
              </Popover>
            </Col>
          </Row>
        </Col>
      </Row>
      <PDFExport
        paperSize="A4"
        margin="2cm"
        ref={pdfExportComponent}
        fileName={name + ".pdf"}
      >
        <PreviewProposal data={{ ...proposalData, price, discount, name }} />
      </PDFExport>
    </Space>
  );
};

export default CreateViewProposal;
