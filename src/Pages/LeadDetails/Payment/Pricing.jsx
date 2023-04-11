import React, { useEffect, useState } from "react";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Table,
  Statistic,
  Form,
  InputNumber,
  Input,
  message,
  Spin,
  Modal,
  Result,
} from "antd";
import { FileOutlined } from "@ant-design/icons";
import { Card } from "antd";
import RequirementTag from "Components/RequirementsTag";
import ItineraryService from "services/ItineraryService";
import { useNavigate, useParams } from "react-router-dom";
const { Meta } = Card;
const { Panel } = Collapse;

const { Paragraph } = Typography;
const { Text, Link, Title } = Typography;

const Pricing = () => {
  const [itineraryData, setItineraryData] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [itemSelected, setItemSelected] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const { id } = useParams();
  const leadId = id;

  const refresh = async () => {
    setLoading(true);
    let resp = await ItineraryService.getConfirmedItinerary(leadId);
    console.log("itinerary Data", resp.data);
    if (resp.success) {
      setItineraryData(resp.data);
    } else {
      // message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const saveQuantity = async (data) => {
    const payload = {
      id: data.id,
      items_selected: data.items_selected,
      type: data.type,
    };
    setEditModalOpen(false);
    setLoading(true);
    let resp = await ItineraryService.updateDayComponent(payload);
    if (!resp.success) message.error(resp.error);
    refresh();
  };

  const columns = [
    {
      title: "Particular",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: "12%",
    },
    {
      title: "Sale Price",
      dataIndex: "price",
      width: "12%",
    },

    {
      title: "Qty",
      dataIndex: "quantity",
      width: "8%",
    },
    {
      title: "Total",
      dataIndex: "total",
      width: "12%",
    },
  ];

  const componentsTable = (
    <>
      {loading || itineraryData == null ? (
        <></>
      ) : (
        itineraryData.dayOrder.map((dayId, i) =>
          itineraryData.days[dayId].componentIds.map((componentId, j) => {
            const component = itineraryData.dayComponents[componentId];

            return component?.checkin_or_checkout == "CHECKOUT" ? (
              <></>
            ) : (
              <Row
                key={component._id}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  paddingBottom: "5px",
                }}
              >
                <Col span={6}>
                  <>
                    <Row
                      gutter={6}
                      style={{ fontWeight: "bold", margin: "3px 0" }}
                    >
                      <Col>{`Day ${i + 1} - ${
                        component.master_component?.name
                      }`}</Col>
                      <Col>
                        <RequirementTag requirement={component.type} />
                      </Col>
                    </Row>
                    <Row gutter={6}>
                      {component.type == "STAY" && (
                        <Col>
                          {component?.duration ?? 1}
                          {" Nights"}
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col>
                        {"₹"}
                        {component.items_selected.reduce(function (sum, item) {
                          return (sum +=
                            item.quantity *
                            item.price *
                            (component?.duration ?? 1));
                        }, 0)}
                      </Col>
                      <Col flex="auto">
                        <Row justify="end" style={{ marginRight: "6px" }}>
                          <Button
                            size="small"
                            onClick={() => {
                              setSelectedComponent(component);
                              setSelectedItems(component.items_selected);
                              setEditModalOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </>
                </Col>
                <Col flex="auto">
                  <Table
                    size="small"
                    pagination={false}
                    dataSource={component.items_selected}
                    columns={columns}
                    bordered
                    style={{ backgroundColor: "white" }}
                  />
                </Col>
              </Row>
            );
          })
        )
      )}
    </>
  );

  return (
    <>
      {editModalOpen && (
        <Modal
          open={editModalOpen}
          title={"Edit " + selectedComponent?.master_component?.name ?? "NA"}
          onCancel={() => {
            setEditModalOpen(false);
            setSelectedComponent(null);
          }}
          onOk={() => {
            console.log(selectedItems);
            selectedComponent.items_selected = selectedItems;
            saveQuantity(selectedComponent);
          }}
        >
          <Space size="small" direction="vertical" style={{ width: "100%" }}>
            {selectedItems.map((item, j) => {
              return (
                <Card
                  title={item.name}
                  size="small"
                  extra={
                    <Input.Group compact>
                      <Button size="small">-</Button>
                      <InputNumber
                        style={{ width: "50px" }}
                        min={0}
                        max={100}
                        size="small"
                        defaultValue={item?.quantity ?? 0}
                        onChange={(e) => {
                          console.log(e);
                          let newItemData = selectedItems;
                          newItemData[j].quantity = e;
                          setSelectedItems(newItemData);
                        }}
                      />
                      <Button size="small">+</Button>
                    </Input.Group>
                  }
                >
                  <Row>
                    <Text>{item.inclusions}</Text>
                  </Row>
                  <Row justify="end">
                    <Col>
                      {item?.is_negotiable ? (
                        <Tag color="green">Negotiable price</Tag>
                      ) : (
                        <Tag color="orange">Non-Negotiable price</Tag>
                      )}{" "}
                      ₹{item.price}
                    </Col>
                  </Row>
                </Card>
              );
            })}
            <Card size="small">
              <Row justify="end">
                <Col>
                  <Text strong>
                    Total: ₹
                    {selectedItems.reduce(function (sum, item) {
                      return sum + item.price * item.quantity;
                    }, 0)}
                  </Text>
                </Col>
              </Row>
            </Card>
          </Space>
        </Modal>
      )}
      {loading && <Spin></Spin>}
      {!loading && itineraryData && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col flex={"auto"} style={{ paddingLeft: "24px" }}>
              <Statistic
                title="Cost"
                prefix="₹"
                value={itineraryData?.cost ?? "--"}
              />
            </Col>
            <Col flex={"auto"}>
              <Statistic
                title="Profit"
                prefix="₹"
                value={
                  (itineraryData?.info?.price ?? 0) - (itineraryData?.cost ?? 0)
                }
              />
            </Col>
            <Col flex={"auto"}>
              <Statistic
                title="Total"
                prefix="₹"
                value={itineraryData?.info?.price ?? "--"}
              />
            </Col>
            <Col>
              <Space direction="vertical">
                {/* <Button
                  type="dashed"
                  style={{
                    width: "100%",
                    borderColor: "#1677ff",
                    color: "#1677ff",
                  }}
                  icon={<FileOutlined />}
                >
                  View Invoice
                </Button>
                <Button>Cancel & Generate Invoice</Button> */}
              </Space>
            </Col>
          </Row>
          {!loading && componentsTable}
          {/* <Row gutter={6}>
        <List
          style={{ overflow: "auto" }}
          bordered
          dataSource={componentData}
          size="small"
          renderItem={(item, index) => (
            <List.Item
              style={{ width: "100%" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                
                <Row>
                  
                </Row>
              </Space>
            </List.Item>
          )}
        />
      </Row> */}
        </Space>
      )}
      {itineraryData == null && (
        <Row align="middle" justify="center">
          <Result
            status="404"
            title="No confirmed itineraries yet"
            extra={
              <Button
                onClick={() => navigate(`/leads/${id}/planner`)}
                type="primary"
              >
                See Itineraries
              </Button>
            }
          />
        </Row>
      )}
    </>
  );
};

export default Pricing;
