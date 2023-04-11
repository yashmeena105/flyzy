import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import MasterService from "services/MasterService";
import qs from "qs";
import LocationService from "services/LocationService";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CustomerService from "services/CustomerService";
import paths from "services/apiConstants";
import { useParams } from "react-router-dom";
import { activityTypes, noimage } from "utils/constants";
import { toProperCase } from "utils/stringFunctions";
import AssetService from "services/AssetService";
import SelectImageDrawer from "Components/SelectImageDrawer";
import { ImageSearch } from "@mui/icons-material";
import FormImages from "Components/FormImages/FormImages";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ActivityDrawerForm = ({ open, onClose, isEditing = false }) => {
  const [form] = Form.useForm();

  let { id } = useParams();

  const inputRef = useRef(null);
  const formStartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activityData, setActivityData] = useState({
    destination: "",
    type: "LEISURE",
  });
  const [imageList, setImageList] = useState([]);
  const [tempDestinations, setTempDestinations] = useState([]);

  const { authuser } = useSelector((state) => state.auth);

  const refreshData = async () => {
    setLoading(true);
    let resp = await MasterService.getActivity(id);
    if (resp.success) {
      console.log("Activity Data", resp.data[0]);
      setActivityData(resp.data[0]);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  const refreshImages = async () => {
    setLoading(true);
    let resp = await AssetService.getAssets();
    if (resp.success) {
      console.log("Activity Images", resp.data);
      setImageList(resp.data);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshImages();
    if (id && isEditing) refreshData();
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    let response;
    if (isEditing)
      response = await MasterService.updateMasterActivity({
        payload: { ...values, id: id, _id: activityData._id },
      });
    else response = await MasterService.addActivity({ payload: values });
    console.log(response);
    if (response.success) {
      message.success(isEditing ? "Activity Updated" : "Activity added");
      form.resetFields();
      onClose();
    } else {
      message.error(response.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  const searchDestinations = async (value, callback) => {
    if (value.length > 3) {
      let resp = await LocationService.searchLocations({ search_text: value });
      console.log(resp);
      if (resp.success) {
        callback(resp.data);
      } else {
        callback([]);
      }
    }
  };
  const searchDone = (data) => {
    setTempDestinations(data);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        New
      </div>
    </div>
  );

  const onImageModalClose = (image) => {
    setAddImageModalOpen(false);
    if (image) {
      form.setFieldValue("cover_image_url", image.url);
    }
  };

  return (
    <div>
      {/* <SelectImageDrawer
        fileList={imageList}
        open={addImageModalOpen}
        onClose={onImageModalClose}
      /> */}
      <Modal
        title="Select Image"
        onCancel={() => onImageModalClose(null)}
        open={addImageModalOpen}
        width="90vw"
        centered
        footer={[
          <Button key="back" onClick={() => onImageModalClose(null)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => onImageModalClose(selectedImage)}
          >
            Select
          </Button>,
        ]}
      >
        <Space>
          {imageList.length ? (
            <Row
              gutter={[12, 6]}
              style={{
                width: "100%",
              }}
            >
              {imageList.map((i, j) => {
                const isSelected =
                  JSON.stringify(i) == JSON.stringify(selectedImage);
                return (
                  <Col>
                    <Tooltip
                      title={
                        <Row gutter={[12, 6]}>
                          <Col>
                            <Text style={{ color: "white" }}>
                              {i?.name ?? "Name: NA"}
                            </Text>
                          </Col>
                          <Col>
                            <Button type="text">
                              <EyeOutlined />
                            </Button>
                          </Col>
                        </Row>
                      }
                    >
                      <Image
                        preview={false}
                        style={{
                          padding: "3px",
                          cursor: "pointer",
                          borderRadius: "10px",
                          border: isSelected ? "2px solid #0057ad" : "unset",
                        }}
                        onClick={() => {
                          console.log("pressed", i);
                          setSelectedImage(i);
                        }}
                        src={i?.url}
                        width={160}
                      />
                    </Tooltip>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 60,
              }}
              description={
                <Space direction="vertical">
                  <Text>No data</Text>
                  <div>
                    <span>
                      Something wrong?
                      <br />
                      <a target={"_blank"} href="/contact">
                        Let us know
                      </a>
                      . We really appreciate it.
                    </span>
                  </div>
                </Space>
              }
            ></Empty>
          )}
        </Space>
      </Modal>
      <Drawer
        title={isEditing ? "Edit Activity: #" + id : "Add a new Activity"}
        width={720}
        onClose={() => {
          form.resetFields();
          onClose();
        }}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          disabled={loading}
          initialValues={activityData}
        >
          <Row gutter={16}>
            <Col flex={"auto"}>
              <Form.Item
                name="name"
                label="Activity Name"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="type" label="Activity Type">
                <Radio.Group buttonStyle="solid">
                  {activityTypes.map((t, j) => (
                    <Radio.Button key={j} value={t}>
                      {toProperCase(t)}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Form.Item name="description" label="Activity Description">
                <Input.TextArea
                  rows={2}
                  placeholder="Write a short description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={12}>
              <Form.Item name="destination" label="Location">
                <Select
                  placeholder="Search Location"
                  showSearch
                  labelInValue
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={(newValue) => {
                    if (newValue) {
                      searchDestinations(newValue, searchDone);
                    } else {
                      searchDone([]);
                    }
                  }}
                  notFoundContent={null}
                  options={(tempDestinations || []).map((d) => ({
                    value: JSON.stringify(d),
                    label: d.formatted_address,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Detailed Address" name="address">
                <Input.TextArea rows={1} placeholder="Full Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Form.Item name="images" label="Images">
                <FormImages
                  value={form.getFieldValue("images")}
                  onChange={(val) => {
                    form.setFieldValue("images", val);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      form.resetFields();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default ActivityDrawerForm;
