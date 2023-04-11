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
} from "antd";
import ItineraryService from "services/ItineraryService";
import qs from "qs";
import LocationService from "services/LocationService";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CustomerService from "services/CustomerService";
import paths from "services/apiConstants";
import { useParams } from "react-router-dom";
import { noimage } from "utils/constants";
import { toProperCase } from "utils/stringFunctions";
import AssetService from "services/AssetService";
import SelectImageDrawer from "Components/SelectImageDrawer";
import SelectImageModal from "Components/SelectImageModal/SelectImageModal";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ItineraryDrawerForm = ({
  open,
  onClose,
  isEditing = false,
  itineraryId,
}) => {
  const [form] = Form.useForm();

  const id = itineraryId;

  const inputRef = useRef(null);
  const formStartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itineraryData, setItineraryData] = useState({
    destination: "",
    type: "LEISURE",
  });
  const [imageList, setImageList] = useState([]);
  const [tempDestinations, setTempDestinations] = useState([]);

  const { authuser } = useSelector((state) => state.auth);

  const refreshData = async () => {
    setLoading(true);
    let resp = await ItineraryService.getItinerary(id);
    if (resp.success) {
      console.log("Itinerary Data", resp.data);
      setItineraryData(resp.data?.info);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  const refreshImages = async () => {
    setLoading(true);
    let resp = await AssetService.getAssets();
    if (resp.success) {
      setImageList(resp.data);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshImages();
    console.log("refresing");
    if (id && isEditing) {
      refreshData();
    }
  }, []);

  const [imageCheckboxOptions, setImageCheckboxOptions] = useState(
    (itineraryData?.images ?? []).map((i) => {
      return {
        label: <Image width={80} src={JSON.parse(i)?.url} fallback={noimage} />,
        value: i,
      };
    })
  );

  const onFinish = async (values) => {
    setLoading(true);
    let response;
    if (isEditing)
      response = await ItineraryService.updateItinerary({
        payload: { ...values },
        id: id,
      });
    else response = await ItineraryService.addItinerary({ payload: values });
    console.log(response);
    if (response.success) {
      message.success(isEditing ? "Itinerary Updated" : "Itinerary added");
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
      <SelectImageModal open={addImageModalOpen} onClose={onImageModalClose} />
      <Drawer
        title={isEditing ? "Edit Itinerary: #" + id : "Add a new Itinerary"}
        width={720}
        onClose={onClose}
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
          initialValues={itineraryData}
        >
          <Row gutter={16}>
            <Col flex={"auto"}>
              <Form.Item
                name="name"
                label="Itinerary Name"
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
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Form.Item name="description" label="Itinerary Description">
                <Input.TextArea
                  rows={2}
                  placeholder="Write a short description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Text style={{ marginBottom: "16px" }}>Cover Image</Text>
              <Row>
                <Col
                  flex="32px"
                  style={{
                    borderRadius: "6px",
                    overflow: "clip",
                    height: "32px",
                  }}
                >
                  <Image
                    src={form.getFieldValue("cover_image_url") ?? "error"}
                    fallback={noimage}
                    height={"32px"}
                  ></Image>
                </Col>
                <Col flex="auto">
                  <Form.Item name="cover_image_url">
                    <Input placeholder="url" />
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    onClick={() => {
                      setAddImageModalOpen(true);
                    }}
                    type="dashed"
                  >
                    Select
                  </Button>
                </Col>
              </Row>
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

export default ItineraryDrawerForm;
