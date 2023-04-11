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
  Steps,
} from "antd";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import MasterService from "services/MasterService";
import VisaDrawerForm from "Forms/VisaDrawerForm";
import { auth } from "Config/firebase";
import MapSection from "../../Components/Map/Map";
import ComponentTypeTag from "Components/ComponentTypeTag";
import Icon, {
  HomeOutlined,
  ShopOutlined,
  EditFilled,
  SaveOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getComponentTypeColor,
  getComponentTypeIcon,
  noimage,
} from "utils/constants";
import icons from "Assets/Icons";
import PublishModal from "Components/PublishModal/PublishComponent";
import ImageCarousal from "Components/ImageCarousal/ImageCarousal";
import { useSelector } from "react-redux";

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

const VisaDetails = ({
  actid,
  readonly = false,
  importable,
  onImport,
  location,
  addToCartAction,
}) => {
  let { url_id } = useParams();
  const { profile } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [visaData, setVisaData] = useState({});
  const [visaDrawerOpen, setVisaDrawerOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [data, setData] = useState([]);

  let id = actid ?? url_id;
  const isMine = visaData?.company_id?._id == profile.company_id._id;

  const refresh = async () => {
    setLoading(true);
    let resp = await MasterService.getVisa(id);
    if (resp.success) {
      console.log("Visa Data", resp.data);
      setVisaData(resp.data[0]);
      setData(resp.data[0]?.packages ?? []);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  const updatePackages = async (packageData) => {
    setLoading(true);
    let resp = await MasterService.updateMasterVisa({
      payload: { _id: visaData._id, packages: packageData },
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

  const dest = JSON.parse(visaData?.destination?.value ?? "{}");
  const loc = {
    address: dest.formatted_address,
    ...dest.location,
    place_id: dest?.city_id,
  };

  // Table Start
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
        updatePackages(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        updatePackages(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Package/Ticket Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: "10%",
      editable: true,
    },
    {
      title: "Price",
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
      width: "40%",
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

  // Table End

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      {publishModalOpen && (
        <PublishModal
          open={publishModalOpen}
          onClose={(data) => {
            refresh();
            setPublishModalOpen(false);
          }}
          type="VISA"
          _id={visaData._id}
          is_published={visaData?.is_published ?? false}
        />
      )}
      <VisaDrawerForm
        isEditing
        open={visaDrawerOpen}
        onClose={() => {
          setVisaDrawerOpen(false);
          refresh();
        }}
      />
      <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
        <Row gutter={[6, 6]} align="middle" wrap={false} justify="start">
          <Col>
            <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
              {visaData.name}{" "}
              <span style={{ fontSize: "16px", color: "gray" }}>
                - {loc.address}
              </span>
            </Text>
          </Col>
          <Col>
            <ComponentTypeTag componentType={visaData.type} />
          </Col>
          {!readonly && (
            <Col>
              <Button
                onClick={() => {
                  setVisaDrawerOpen(true);
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
                  visaData?.is_published
                    ? 4
                    : visaData?.packages?.length > 0
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
                    title: "Add Packages",
                    // description: "",
                  },
                  {
                    title: (
                      <Button
                        type={
                          visaData?.is_published ?? false
                            ? "default"
                            : "primary"
                        }
                        style={{}}
                        icon={<ShopOutlined />}
                        onClick={() => {
                          setPublishModalOpen(true);
                        }}
                      >
                        {visaData?.is_published ?? false
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
            <ImageCarousal images={visaData?.images ?? []} />
          </Col>
        </Row>
        <Row gutter={[48, 6]}>
          <Col span={6}>
            <Title level={5}>Description</Title>
            <Paragraph
              ellipsis={{
                rows: 4,
                expandable: true,
                onEllipsis: (ellipsis) => {},
              }}
            >
              {visaData.description}
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[12, 6]} align={"middle"}>
          <Col flex="auto">
            <Title level={3}>Packages and Price</Title>
          </Col>
          <Col>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Add package
            </Button>
          </Col>
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
      </Space>
    </div>
  );
};

export default VisaDetails;
