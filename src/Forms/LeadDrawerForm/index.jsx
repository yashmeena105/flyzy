import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import debounce from "lodash/debounce";
import LeadService from "services/LeadService";
import qs from "qs";
import LocationService from "services/LocationService";
import {
  getLeadSourceIcon,
  getRequirementColor,
  getRequirementIcon,
  requirementOptions,
  leadSources,
} from "utils/constants";
import RequirementTag from "Components/RequirementsTag";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getInitials, getRandomColor } from "utils/stringFunctions";
import CustomerService from "services/CustomerService";
import paths from "services/apiConstants";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const LeadDrawerForm = ({ open, onClose, isEditing = false }) => {
  const [form] = Form.useForm();

  let { id, key } = useParams();

  const inputRef = useRef(null);
  const formStartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState({
    destinations: [""],
    lead_type: "COMPANY",
    customer_id: null,
    customer_name: null,
  });
  const [name, setName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [tempDestinations, setTempDestinations] = useState([]);
  const fetchRef = useRef(0);

  const { authuser } = useSelector((state) => state.auth);
  const { MemberList } = useSelector((state) => state.AssignMember);
  const getCustomers = async () => {
    setLoading(true);
    let resp = await CustomerService.getCustomers();
    if (resp.success) {
      console.log("Customers", resp.data);
      setCustomers(resp.data);
    } else {
      message.error(resp?.error ?? "Something went wrong");
      setCustomers([]);
    }
    setLoading(false);
  };

  const refreshData = async () => {
    setLoading(true);
    let resp = await LeadService.getLead(id);
    if (resp.success) {
      console.log("Lead Data", resp.data);
      resp.data.travel_dates = (resp.data.travel_dates ?? []).map((d) =>
        dayjs(d)
      );
      resp.data.customer = {
        label: resp.data.customer_name,
        value: JSON.stringify({
          customer_name: resp.data.customer_name,
          customer_id: resp.data.customer_id,
        }),
      };
      // resp.data.destinations = (resp.data.destinations ?? []).map((d) => ({
      //   label: d.label,
      //   value: d.value,
      // }));
      setLeadData(resp.data);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("useEffwct leaddrawerform", MemberList);
    if (formStartRef?.current) formStartRef.current.focus();
    getCustomers();
    if (id && isEditing) refreshData();
  }, []);

  const onFinish = async (values) => {
    console.log("Success: bf", values); // Clean formdata before submit
    values.travel_dates = (values.travel_dates ?? []).map((t) =>
      dayjs(t).toISOString()
    );
    values.customer_id = JSON.parse(values.customer.value).customer_id;
    values.customer_name = JSON.parse(values.customer.value).customer_name;
    // Clean formdata end
    delete values.customer;

    console.log("Success:af", values);
    setLoading(true);
    let response;
    if (isEditing)
      response = await LeadService.updateLead({
        payload: { ...values, lead_id: id },
      });
    else response = await LeadService.addLead({ payload: values });
    console.log(response);
    if (response.success) {
      message.success(isEditing ? "Lead Updated" : "Lead added");
      form.resetFields();
      onClose();
    } else {
      message.error(response.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  // Add customer logic
  const onNameChange = (event) => {
    setName(event.target.value);
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

  const addItem = (e) => {
    console.log("add item e", e);
    e.preventDefault();
    console.log("add item name", name);
    setCustomers([...customers, { customer_name: name }]);
    setName("");
    form.setFieldValue("customer_name", name);

    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
  };
  // Add customer logic end
  return (
    <div>
      <Drawer
        title={isEditing ? "Edit Lead: #" + id : "Add a new Lead"}
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
          initialValues={leadData}
        >
          <Row gutter={16}>
            <Col flex={"auto"}>
              <Form.Item
                name="customer"
                label="Customer"
                rules={[
                  {
                    required: true,
                    message: "Please select customer",
                  },
                ]}
              >
                <Select
                  ref={formStartRef}
                  showSearch
                  labelInValue
                  placeholder="Search customer"
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log(e);
                    let cust = JSON.parse(e.value);
                    form.setFieldValue("customer_name", cust?.customer_name);
                    form.setFieldValue("email", cust?.email);
                    form.setFieldValue("customer_id", cust?._id);
                    form.setFieldValue("lead_source", cust?.last_lead_source);
                    form.setFieldValue("phone_number", cust?.phone_number);
                    form.setFieldValue(
                      "whatsapp_number",
                      cust?.whatsapp_number
                    );
                    form.setFieldValue("lead_type", cust?.customer_type);
                  }}
                  onSearch={(e) => {
                    setName(e);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={customers?.map((c) => ({
                    label: c.customer_name,
                    // (
                    //   <Row justify="space-between">
                    //     <Col>{c.customer_name}</Col>
                    //     <Col>
                    //       <Button
                    //         size="small"
                    //         type="text"
                    //         icon={<EditOutlined />}
                    //         onClick={() => {}}
                    //       />
                    //     </Col>
                    //   </Row>
                    // )
                    value: JSON.stringify(c),
                  }))}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                        orientation={"left"}
                        orientationMargin={10}
                      >
                        Or add new customer
                      </Divider>
                      <Row
                        gutter={6}
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Col flex={"auto"}>
                          <Input
                            placeholder="Customer Name"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                        </Col>
                        <Col>
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addItem}
                          >
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="lead_type" label="Type">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="INDIVIDUAL">Individual</Radio.Button>
                  <Radio.Button value="COMPANY">Company</Radio.Button>
                  <Radio.Button value="TA">Travel Agency</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            {/* <Col span={3}>
              <Form.Item
                name="assignee"
                label="Assignee"
                rules={[
                  {
                    required: true,
                    message: "Please select assignee",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  options={MemberList?.data?.map((a) => ({
                    label: (
                      <Tooltip
                        placement="left"
                        title={
                          <Space>
                            <Text style={{ color: "white" }}>
                              {a.name} {a.email}
                            </Text>
                          </Space>
                        }
                      >
                        <Avatar
                          style={{
                            backgroundColor: a?.color,
                          }}
                          size="small"
                        >
                          {getInitials(a.name)}
                        </Avatar>
                      </Tooltip>
                    ),
                    value: JSON.stringify(a),
                  }))}
                />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={[12, 6]}>
            <Col>
              <Form.Item name="lead_source" label="Source">
                <Radio.Group>
                  {leadSources.map((s, i) => (
                    <Radio key={i} value={s}>
                      {getLeadSourceIcon(s)}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter lead email" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone_number" label="Phone number">
                <Input
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter phone number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="whatsapp_number" label="Whatsapp number">
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
          <Row gutter={[12, 6]}>
            <Col flex={"auto"}>
              <Form.Item name="requirements" label="Requirement">
                <Checkbox.Group>
                  <Row gutter={[12, 6]}>
                    {requirementOptions.map((r, i) => (
                      <Col key={i} flex={"auto"}>
                        <Checkbox value={r}>
                          <RequirementTag requirement={r} />
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col span={12}>
              <Form.Item name="notes" label="Notes">
                <Input.TextArea
                  rows={1}
                  placeholder="Enter notes here e.g. Bank Details"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={[6, 3]}>
                <Col span={8}>
                  <Form.Item name={["pax", "adult"]} label="Adults">
                    <InputNumber
                      min={0}
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Adults"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["pax", "child"]} label="Children">
                    <InputNumber
                      min={0}
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Children"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["pax", "infant"]} label="Infants">
                    <InputNumber
                      min={0}
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Infants"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[12, 6]} align={"middle"}>
            <Col span={10}>
              <Form.Item name="travel_dates" label="Journey Dates">
                <RangePicker
                  format={"DD/MM/YY"}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    const duration = dayjs(
                      form.getFieldValue("travel_dates")[1]
                    ).diff(dayjs(form.getFieldValue("travel_dates")[0]), "day");
                    form.setFieldValue("no_of_days", duration);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Text style={{ textAlign: "center" }}>OR</Text>
            </Col>
            <Col span={4}>
              <Form.Item name="no_of_days" label="No. of Days">
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  onChange={(val) => {
                    console.log("changed manually", val);
                    form.setFieldValue("travel_dates", [null, null]);
                  }}
                  // formatter={(value) =>
                  //   `${value} days`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  // }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}></Col>
          </Row>

          <Row gutter={[12, 6]}>
            <Col span={12}>
              <Form.Item name="origin" label="From">
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
              <Form.List name="destinations">
                {(fields, { add, remove }) => (
                  <>
                    <label>Destinations</label>
                    <div style={{ height: "8px" }}></div>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={[12, 0]}>
                        <Col flex={"auto"}>
                          <Row>
                            <Form.Item
                              style={{ width: "90%" }}
                              {...restField}
                              name={[name]}
                              rules={[
                                {
                                  required: true,
                                  message: "Destination is required",
                                },
                              ]}
                            >
                              {/* {console.log(fields[key])} */}
                              <Select
                                placeholder="Search Destination"
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
                            <Button
                              onClick={() => remove(name)}
                              icon={<DeleteOutlined />}
                            ></Button>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Destination
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}></Col>
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

export default LeadDrawerForm;
