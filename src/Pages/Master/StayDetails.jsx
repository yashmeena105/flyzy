import React, { useEffect, useState } from "react";
import {
  Collapse,
  Descriptions,
  Divider,
  Row,
  Col,
  Typography,
  Space,
  message,
  Image,
  Button,
  Carousel,
  Tag,
  Form,
  InputNumber,
  Input,
  Popconfirm,
  Table,
  Empty,
  Popover,
  Steps,
  Rate,
  Spin,
} from "antd";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import MasterService from "services/MasterService";
import StayDrawerForm from "Forms/StayDrawerForm";
import { auth } from "Config/firebase";
import MapSection from "../../Components/Map/Map";
import ComponentTypeTag from "Components/ComponentTypeTag";
import Icon, {
  HomeOutlined,
  InfoCircleTwoTone,
  ShopOutlined,
  EditFilled,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  getComponentTypeColor,
  getComponentTypeIcon,
  noimage,
} from "utils/constants";
import icons from "Assets/Icons";
import PublishModal from "Components/PublishModal/PublishComponent";
import { useSelector } from "react-redux";
import ImageCarousal from "Components/ImageCarousal/ImageCarousal";

const { Meta } = Card;
const { Panel } = Collapse;
const { Paragraph } = Typography;
const { Text, Title } = Typography;
const { TextArea } = Input;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "textarea" ? (
      <TextArea />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StayDetails = ({
  stid,
  readonly = false,
  importable,
  onImport,
  location,
  addToCartAction,
}) => {
  let { url_id } = useParams();
  const { profile } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [stayData, setStayData] = useState({});
  const [stayDrawerOpen, setStayDrawerOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [data, setData] = useState([]);

  let id = stid ?? url_id;

  console.log(id);

  const isMine = stayData?.company_id?._id == profile.company_id._id;

  const refresh = async () => {
    setLoading(true);
    let resp = await MasterService.getStay(id);
    if (resp.success) {
      console.log("Stay Data", resp.data);
      setStayData(resp.data[0]);
      setData(resp.data[0]?.rooms ?? []);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  const updateRooms = async (roomData) => {
    setLoading(true);
    let resp = await MasterService.updateMasterStay({
      payload: { id: stayData.id, rooms: roomData },
    });
    if (resp.success) {
      refresh();
    } else {
      message.error(resp?.error ?? "Something went wrong");
      refresh();
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const dest = JSON.parse(stayData?.destination?.value ?? "{}");
  const loc = {
    address: dest.formatted_address,
    ...dest.location,
    place_id: dest?.city_id,
  };

  // Table Start
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    console.log("newData", newData);
    updateRooms(newData);
  };
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      cost: 0,
      price: 0,
      inclusions: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const handleAdd = () => {
    const rand = Math.random() * 10;
    const newData = {
      key: rand,
      name: "",
      cost: "",
      price: "",
      inclusions: "",
    };
    setData([...data, newData]);
    setEditingKey(rand);
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        console.log("new Data", newData);
        updateRooms(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        updateRooms(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  let columns = [
    {
      title: "Room/Package Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Cost / N",
      dataIndex: "cost",
      width: "10%",
      editable: true,
    },
    {
      title: (
        <Row gutter={6} align="middle">
          <Col>Price / N</Col>
        </Row>
      ),
      dataIndex: "price",
      width: "10%",
      editable: true,
    },
    {
      title: "Inclusions",
      dataIndex: "inclusions",
      width: "40%",
      editable: true,
    },
    {
      title: "",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Row gutter={[18, 6]}>
            <Col>
              <Typography.Link onClick={() => save(record.key)}>
                <SaveOutlined />
              </Typography.Link>
            </Col>
            <Col>
              <Typography.Link type="secondary" onClick={cancel}>
                <CloseOutlined />
              </Typography.Link>
            </Col>
          </Row>
        ) : (
          <Row gutter={[18, 6]}>
            <Col>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                <EditOutlined />
              </Typography.Link>
            </Col>
            <Col>
              <Typography.Link
                type="danger"
                disabled={editingKey !== ""}
                onClick={() => handleDelete(record.key)}
              >
                <DeleteOutlined />
              </Typography.Link>
            </Col>
          </Row>
        );
      },
    },
  ];
  if (readonly) {
    columns.splice(1, 1);
    columns.pop();
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "cost" || col.dataIndex === "price"
            ? "number"
            : col.dataIndex === "inclusions"
            ? "textarea"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const table = (
    <>
      <Row gutter={[12, 6]} align={"middle"}>
        <Col flex="auto">
          <Title level={3}>Rooms and Price</Title>
        </Col>
        {!readonly && (
          <Col>
            <Button onClick={handleAdd} type="primary">
              Add Room/Package
            </Button>
          </Col>
        )}
      </Row>
      <Row gutter={[12, 6]}>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              loading={loading}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
            />
          </Form>
        </Col>
      </Row>
    </>
  );

  // Table End

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      {publishModalOpen && !readonly && (
        <PublishModal
          open={publishModalOpen}
          onClose={(data) => {
            refresh();
            setPublishModalOpen(false);
          }}
          type="STAY"
          content={<StayDetails stid={stayData.id} readonly={true} />}
          _id={stayData._id}
          id={stayData.id}
          is_published={stayData?.is_published ?? false}
        />
      )}
      {!readonly && (
        <StayDrawerForm
          initialValues={stayData}
          isEditing
          open={stayDrawerOpen}
          onClose={() => {
            setStayDrawerOpen(false);
            refresh();
          }}
        />
      )}
      {loading ? (
        <Spin spinning={loading}>
          <Row style={{ height: "300px" }}></Row>
        </Spin>
      ) : (
        <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
          <Row gutter={[6, 6]} align="middle" wrap={false} justify="start">
            <Col>
              <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                {stayData?.name}{" "}
                <span style={{ fontSize: "16px", color: "gray" }}>
                  - {loc?.address}
                </span>
              </Text>
            </Col>
            <Col>
              <ComponentTypeTag componentType={stayData?.type} />
            </Col>
            {!readonly && (
              <Col>
                <Button
                  onClick={() => {
                    setStayDrawerOpen(true);
                  }}
                  icon={<EditFilled />}
                >
                  Edit Details
                </Button>
              </Col>
            )}
            {importable && (
              <Col flex="auto">
                <Row justify="end">
                  <Button
                    size="large"
                    type="primary"
                    disabled={location == "MARKETPLACE" ? isMine : false}
                    onClick={addToCartAction}
                  >
                    Add to cart
                  </Button>
                </Row>
              </Col>
            )}
          </Row>
          {!readonly && (
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
                    stayData?.is_published
                      ? 4
                      : stayData?.rooms?.length > 0
                      ? 1
                      : 0
                  }
                  items={[
                    {
                      title: "Basic Details",
                      // description: (
                      //   <Button
                      //     size="small"
                      //     style={{}}
                      //     icon={<EditOutlined />}
                      //     onClick={() => {
                      //       setStayDrawerOpen(true);
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
                      title: "Add Rooms",
                      // description: "",
                    },
                    {
                      title: (
                        <Button
                          type={
                            stayData?.is_published ?? false
                              ? "default"
                              : "primary"
                          }
                          style={{}}
                          icon={<ShopOutlined />}
                          onClick={() => {
                            setPublishModalOpen(true);
                          }}
                        >
                          {stayData?.is_published ?? false
                            ? "Open for sale! View Listing"
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
          <Row gutter={[12, 6]}>
            <Col span={6} style={{ height: "100%" }}>
              <Title level={5}>Destination</Title>
              <Col style={{ height: "180px" }}>
                {loc.lat && loc.lng ? (
                  <MapSection location={loc} zoomLevel={14} />
                ) : (
                  <></>
                )}
              </Col>
            </Col>
            <Col span={18} style={{}}>
              <Title level={5}>Images</Title>
              <ImageCarousal images={stayData?.images ?? []} />
            </Col>
          </Row>
          <Row gutter={[48, 6]}>
            {stayData?.stars > 0 && (
              <Col>
                <Title level={5}>Star Rating</Title>
                <Rate disabled value={stayData?.stars}></Rate>
              </Col>
            )}
            <Col span={6}>
              <Title level={5}>Description</Title>
              <Paragraph
                ellipsis={{
                  rows: 4,
                  expandable: true,
                  onEllipsis: (ellipsis) => {},
                }}
              >
                {stayData?.description}
              </Paragraph>
            </Col>
            {/* <Col span={6}>
            <Title level={5}>Highlights</Title>
            <Paragraph
              ellipsis={{
                rows: 4,
                expandable: true,
                onEllipsis: (ellipsis) => {},
              }}
            >
              {(stayData.highlights ?? "").length ? stayData.highlights : "--"}
            </Paragraph>
          </Col> */}
          </Row>
          {table}
        </Space>
      )}
    </div>
  );
};

export default StayDetails;
