import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import MasterService from "services/MasterService";
const { Title } = Typography;
const { Option } = Select;

const VendorDrawerForm = ({ open, onClose, initialValues }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    let response = await MasterService.addVendor({ payload: values });
    console.log(response);
    setLoading(false);
    form.resetFields();
    onClose();
    message.success("Vendor added");
  };
  return (
    <div>
      <Drawer
        title={
          initialValues
            ? "Edit Vendor: #" + initialValues.id
            : "Add a new Vendor"
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
          initialValues={initialValues}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter vendor name",
                  },
                ]}
              >
                <Input placeholder="Please enter vendor name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Enter vendor email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Phone number">
                <Input
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter phone number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="whatsapp" label="Whatsapp number">
                <Input
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Enter whatsapp number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="notes" label="Notes">
                <Input.TextArea
                  rows={4}
                  placeholder="Enter notes here e.g. Bank Details"
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

export default VendorDrawerForm;
