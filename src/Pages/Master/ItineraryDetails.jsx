import React, { useEffect, useState } from "react";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Space,
  message,
  notification,
  Button,
  Modal,
  Badge,
  Statistic,
  Divider,
  Drawer,
  Image,
  Steps,
  Dropdown,
} from "antd";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import ItineraryService from "services/ItineraryService";
import ItineraryDrawerForm from "Forms/ItineraryDrawerForm";
import ComponentTypeTag from "Components/ComponentTypeTag";
import Icon, {
  ShareAltOutlined,
  EditFilled,
  CheckOutlined,
  ShopOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import icons from "Assets/Icons";
import PublishModal from "Components/PublishModal/PublishComponent";
import ItineraryBuilder from "Components/ItineraryBuilder/ItineraryBuilder";
import { useSelector } from "react-redux";
import CreateViewProposal from "Components/CreateViewProposal/CreateViewProposal";
import { SettingsInputComponentSharp } from "@mui/icons-material";
import { noimage } from "utils/constants";

const { Meta } = Card;
const { Panel } = Collapse;
const { Paragraph } = Typography;
const { Text, Title } = Typography;

const ItineraryDetails = ({ itid = null, mini = false }) => {
  let { itinerary_id } = useParams();

  const id = itinerary_id ?? itid;

  const [loading, setLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState({});
  const [cost, setCost] = useState(0);
  const [itineraryDrawerOpen, setItineraryDrawerOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [readonly, setReadonly] = useState(true);
  const { profile } = useSelector((state) => state.profile);

  const [api, contextHolder] = notification.useNotification();
  const showNotification = ({
    title,
    description,
    placement = "topRight",
    duration = 4,
  }) => {
    api.open({
      message: title,
      description,
      placement,
      duration,
    });
  };

  useEffect(() => {
    setReadonly(profile?.company_id._id != itineraryData?.company_id);
  }, [itineraryData]);

  const refresh = async () => {
    setLoading(true);
    let resp = await ItineraryService.getItinerary(id);
    if (resp.success) {
      setItineraryData(resp.data?.info);
      setCost(resp.data?.cost);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      {contextHolder}
      {publishModalOpen && (
        <PublishModal
          open={publishModalOpen}
          onClose={(data) => {
            refresh();
            setPublishModalOpen(false);
          }}
          type="ITINERARY"
          _id={itineraryData._id}
          id={itineraryData.id}
          is_published={itineraryData?.is_published ?? false}
          price_per_person={itineraryData?.price_per_person}
        />
      )}
      {proposalModalOpen && (
        <Modal
          open={proposalModalOpen}
          width="600px"
          title={"Proposal - " + itineraryData?.name ?? "--"}
          onCancel={() => {
            setProposalModalOpen(false);
          }}
          footer={null}
        >
          <CreateViewProposal data={itineraryData} cost={cost} />
        </Modal>
      )}
      <ItineraryDrawerForm
        itineraryId={id}
        isEditing
        open={itineraryDrawerOpen}
        onClose={() => {
          setItineraryDrawerOpen(false);
          refresh();
        }}
      />
      <Space
        direction="vertical"
        style={{ width: "100%", padding: mini ? "0" : "12px" }}
      >
        <Row align={"middle"} gutter={[12, 6]}>
          <Col>
            <Image
              height="36px"
              style={{ borderRadius: "12px" }}
              src={itineraryData?.cover_image_url ?? "error"}
              fallback={noimage}
            ></Image>
          </Col>
          <Col flex={"auto"}>
            <Row gutter={[12, 12]} align="middle">
              <Col>
                <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {itineraryData?.name ?? "--"}
                  <span style={{ fontSize: "16px", color: "gray" }}></span>
                </Text>
              </Col>
              <Col>
                <Button
                  type="link"
                  onClick={() => {
                    setItineraryDrawerOpen(true);
                  }}
                  icon={<EditFilled />}
                >
                  Edit
                </Button>
              </Col>
              {itineraryData.type != "TEMPLATE" &&
                itineraryData.lead_id != null &&
                itineraryData.company_id == profile?.company_id._id && (
                  <Col>
                    <Button
                      type={itineraryData?.is_confirmed ? "link" : "primary"}
                      onClick={async () => {
                        await ItineraryService.confirmItinerary(id);
                        refresh();
                      }}
                      icon={<CheckOutlined />}
                    >
                      {itineraryData?.is_confirmed
                        ? "Confirmed By Customer"
                        : "Mark as Confirmed"}
                    </Button>
                  </Col>
                )}
            </Row>
          </Col>
          {!readonly && (
            <Col>
              <Dropdown
                menu={{
                  items: [
                    { label: "Delete Itinerary", key: "delete", danger: true },
                  ],
                  onClick(e) {
                    console.log(e.key);
                  },
                }}
                trigger={["click"]}
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </Col>
          )}
        </Row>
        {!readonly &&
          itineraryData.type == "TEMPLATE" &&
          itineraryData.company_id == profile?.company_id._id && (
            <Row gutter={[12, 6]} align="middle">
              <Col
                flex="auto"
                style={{
                  border: "1px solid #e6f4ff",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  marginTop: "12px",
                }}
              >
                <Steps
                  style={{ padding: "12px" }}
                  // labelPlacement="vertical"
                  current={
                    itineraryData?.is_published
                      ? 4
                      : itineraryData?.price > 0
                      ? 1
                      : 0
                  }
                  items={[
                    {
                      title: "Build Itinerary",
                      // description: (
                      //   <Button
                      //     size="small"
                      //     style={{}}
                      //     icon={<EditOutlined />}
                      //     onClick={() => {
                      //       setTransportDrawerOpen(true);
                      //     }}
                      //   >
                      //     Basic Details
                      //   </Button>
                      // ),
                      // description: (
                      //   <div style={{ width: "200px" }}>
                      //     Add images, description, amenities etc.
                      //   </div>
                      // ),
                    },
                    {
                      title: "Add Pricing",
                      // description: "",
                    },
                    {
                      title: (
                        <Button
                          type={
                            itineraryData?.is_published ?? false
                              ? "default"
                              : "primary"
                          }
                          style={{}}
                          icon={<ShopOutlined />}
                          onClick={() => {
                            setPublishModalOpen(true);
                          }}
                        >
                          {itineraryData?.is_published ?? false
                            ? "Published! View Listing"
                            : "Publish to Marketplace"}
                        </Button>
                      ),
                      // description: (

                      // ),
                      // description: "Get more sales with our marketplace",
                    },
                  ]}
                />
              </Col>
            </Row>
          )}
        <Row gutter={[12, 6]} align="top">
          <Col>
            <Card bordered={false} size="small">
              <Row gutter={6}>
                <Col>
                  <Statistic
                    title="Cost"
                    value={cost}
                    precision={0}
                    prefix="₹"
                  />
                </Col>
                <Col>
                  <Divider type="vertical" style={{ height: "100%" }}></Divider>
                </Col>
                <Col>
                  <Statistic
                    title="Price"
                    value={
                      itineraryData.type == "TEMPLATE"
                        ? itineraryData?.price_per_person
                        : itineraryData?.price ?? "--"
                    }
                    precision={0}
                    prefix="₹"
                  />
                </Col>
                <Col>
                  <Divider type="vertical" style={{ height: "100%" }}></Divider>
                </Col>
                <Col>
                  <Button
                    type="dashed"
                    style={{ height: "100%" }}
                    onClick={() => {
                      // setCartDrawerOpen(true);
                    }}
                  >
                    <Badge count={cartCount} showZero>
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </Button>
                </Col>
                {itineraryData.type != "TEMPLATE" &&
                  itineraryData.lead_id != null &&
                  itineraryData.company_id == profile?.company_id._id && (
                    <>
                      <Col>
                        <Divider
                          type="vertical"
                          style={{ height: "100%" }}
                        ></Divider>
                      </Col>
                      <Col>
                        <Button
                          type="primary"
                          style={{ height: "100%" }}
                          onClick={() => {
                            setProposalModalOpen(true);
                          }}
                        >
                          <Space direction="vertical">
                            <Row justify="center">
                              <ShareAltOutlined />
                            </Row>
                            <Row justify="center">Share Proposal</Row>
                          </Space>
                        </Button>
                      </Col>
                    </>
                  )}
                {itineraryData.type == "TEMPLATE" &&
                  itineraryData.company_id == profile?.company_id._id && (
                    <>
                      <Col>
                        <Divider
                          type="vertical"
                          style={{ height: "100%" }}
                        ></Divider>
                      </Col>
                      <Col>
                        <Button
                          style={{ height: "100%" }}
                          onClick={() => {
                            setPublishModalOpen(true);
                          }}
                        >
                          <Space direction="vertical">
                            <Row justify="center">
                              {itineraryData?.is_published ? (
                                <CheckOutlined />
                              ) : (
                                <PublishOutlinedIcon />
                              )}
                            </Row>
                            <Row justify="center">
                              {itineraryData?.is_published
                                ? "Published to Marketplace"
                                : "Publish to Marketplace"}
                            </Row>
                          </Space>
                        </Button>
                      </Col>
                    </>
                  )}
              </Row>
            </Card>
          </Col>
          <Col flex="auto">
            <Card bordered={false} size="small">
              <Row gutter={12}>
                <Col span={12}>
                  <Row>
                    <Text strong>Description</Text>
                  </Row>
                  <Row>
                    <Paragraph
                      ellipsis={{
                        rows: 2,
                        expandable: true,
                        onEllipsis: () => {},
                      }}
                    >
                      {itineraryData?.description ?? "--"}
                    </Paragraph>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Text strong>Highlights</Text>
                  </Row>
                  <Row>
                    <Paragraph
                      ellipsis={{
                        rows: 2,
                        expandable: true,
                        onEllipsis: () => {},
                      }}
                    >
                      {itineraryData?.highlights ?? "--"}
                    </Paragraph>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={[12, 6]} align={"middle"}>
          <Col flex="auto">
            <Title level={3}>Day Wise Plan</Title>
          </Col>
          <Col></Col>
        </Row>
        <ItineraryBuilder
          id={id}
          _id={itineraryData?._id}
          showNotification={showNotification}
          setCartCount={(n) => setCartCount(n)}
          cartDrawerOpen={cartDrawerOpen}
          setCartDrawerOpen={setCartDrawerOpen}
        />
      </Space>
    </div>
  );
};

export default ItineraryDetails;
