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
  Rate,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import MasterService from "services/MasterService";
import qs from "qs";
import LocationService from "services/LocationService";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CustomerService from "services/CustomerService";
import paths from "services/apiConstants";
import { useParams } from "react-router-dom";
import { transportTypes, noimage } from "utils/constants";
import { toProperCase } from "utils/stringFunctions";
import AssetService from "services/AssetService";
import SelectImageDrawer from "Components/SelectImageDrawer";
import SelectImageModal from "Components/SelectImageModal/SelectImageModal";
import FormImages from "Components/FormImages/FormImages";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TransportDrawerForm = ({
  initialValues,
  open,
  onClose,
  isEditing = false,
}) => {
  const [form] = Form.useForm();

  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = useState(false);
  const [transportData, setTransportData] = useState(initialValues);
  const [tempDestinations, setTempDestinations] = useState([]);

  const refreshData = async () => {
    setLoading(true);
    let resp = await MasterService.getTransport(id);
    if (resp.success) {
      console.log("Transport Data", resp.data[0]);
      setTransportData(resp.data[0]);
      const keys = Object.keys(transportData);
      keys.forEach((k) => {
        form.setFieldValue(k, transportData[k]);
      });
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id && isEditing) refreshData();
  }, [open]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    let response;
    if (isEditing)
      response = await MasterService.updateMasterTransport({
        payload: { ...values, id: id },
      });
    else response = await MasterService.addTransport({ payload: values });
    console.log(response);
    if (response.success) {
      message.success(isEditing ? "Transport Updated" : "Transport added");
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
      <SelectImageModal open={addImageModalOpen} onClose={onImageModalClose} />
      <Drawer
        title={isEditing ? "Edit Transport: #" + id : "Add a new Transport"}
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
          initialValues={transportData}
        >
          <Row gutter={16}>
            <Col flex={"auto"}>
              <Form.Item
                name="name"
                label="Transport Name"
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
              <Form.Item name="type" label="Transport Type">
                <Radio.Group buttonStyle="solid">
                  {transportTypes.map((t, j) => (
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
              <Form.Item name="description" label="Transport Description">
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
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Form.Item name="images" label="Images">
                <FormImages
                  value={transportData?.images ?? []}
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

export default TransportDrawerForm;
