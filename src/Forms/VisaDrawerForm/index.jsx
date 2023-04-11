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
import MasterService from "services/MasterService";
import qs from "qs";
import LocationService from "services/LocationService";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CustomerService from "services/CustomerService";
import paths from "services/apiConstants";
import { useParams } from "react-router-dom";
import { visaTypes, noimage } from "utils/constants";
import { toProperCase } from "utils/stringFunctions";
import AssetService from "services/AssetService";
import SelectImageDrawer from "Components/SelectImageDrawer";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const VisaDrawerForm = ({ open, onClose, isEditing = false }) => {
  const [form] = Form.useForm();

  let { id } = useParams();

  const inputRef = useRef(null);
  const formStartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visaData, setVisaData] = useState({
    destination: "",
    type: "LEISURE",
  });
  const [imageList, setImageList] = useState([]);
  const [tempDestinations, setTempDestinations] = useState([]);

  const { authuser } = useSelector((state) => state.auth);

  const refreshData = async () => {
    setLoading(true);
    let resp = await MasterService.getVisa(id);
    if (resp.success) {
      console.log("Visa Data", resp.data[0]);
      setVisaData(resp.data[0]);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  // const refreshImages = async () => {
  //   setLoading(true);
  //   let resp = await AssetService.getAssets();
  //   if (resp.success) {
  //     console.log("Visa Images", resp.data);
  //     setImageList(resp.data);
  //   } else {
  //     message.error(resp?.error ?? "Something went wrong");
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    // refreshImages();
    if (id && isEditing) refreshData();
  }, []);

  const [imageCheckboxOptions, setImageCheckboxOptions] = useState(
    (visaData?.images ?? []).map((i, j) => {
      return {
        label: (
          <Image
            key={j}
            width={80}
            src={JSON.parse(i)?.url}
            fallback={noimage}
          />
        ),
        value: i,
      };
    })
  );

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    let response;
    if (isEditing)
      response = await MasterService.updateMasterVisa({
        payload: { ...values, id: id, _id: visaData._id },
      });
    else response = await MasterService.addVisa({ payload: values });
    console.log(response);
    if (response.success) {
      message.success(isEditing ? "Visa Updated" : "Visa added");
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
    console.log(image);
    console.log("imageCheckboxOptions", imageCheckboxOptions);
    if (image) {
      setImageCheckboxOptions([
        ...imageCheckboxOptions,
        {
          label: <Image src={image?.url} width={80} fallback={noimage} />,
          value: JSON.stringify(image),
        },
      ]);
    }
  };

  return (
    <div>
      {/* <SelectImageDrawer
        fileList={imageList}
        open={addImageModalOpen}
        onClose={onImageModalClose}
      /> */}
      <Drawer
        title={
          isEditing ? "Edit Visa Listing: #" + id : "Add a new Visa Listing"
        }
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
          initialValues={visaData}
        >
          <Row gutter={16}>
            <Col flex={"auto"}>
              <Form.Item
                name="name"
                label="Visa Service Name"
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
              <Form.Item name="description" label="Visa Description">
                <Input.TextArea
                  rows={2}
                  placeholder="Write a short description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={12}>
              <Form.Item name="destination" label="Country">
                <Select
                  placeholder="Search Country"
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

export default VisaDrawerForm;
