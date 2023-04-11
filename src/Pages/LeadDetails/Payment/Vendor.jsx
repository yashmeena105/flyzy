import React, { useState } from "react";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Table,
  Statistic,
  Form,
  InputNumber,
  Input,
  Select,
  DatePicker,
  Result,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AllSettledUp from "Components/AllSettledUp";
import VendorDrawerForm from "Forms/VendorDrawerForm";
import { paymentModes, paymentStatuses } from "utils/constants";
import MasterService from "services/MasterService";
const { TextArea } = Input;
const Vendor = () => {
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showVendorDrawerForm = () => {
    setAddVendorOpen(true);
  };
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      vendor: "",
      mode: "",
      amount: "",
      status: "",
      due_date: "",
      status: "",
      paid_at: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
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
        console.log("newData", newData);
        console.log("newDate", new Date(newData[0].paid_at));
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Vendor",
      dataIndex: "vendor",
      width: "140px",
      editable: true,
      required: true,
      inputNode: (
        <Select
          showSearch
          placeholder="Select vendor"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      ),
    },
    {
      title: "Mode",
      dataIndex: "mode",
      width: "20px",
      editable: true,
      inputNode: <Select options={paymentModes} />,
    },
    {
      title: "Txn Id / Ref No.",
      dataIndex: "notes",
      width: "80px",
      editable: true,
      inputNode: <TextArea rows={1} />,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "30px",
      editable: true,
      required: true,
      inputNode: <InputNumber />,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      width: "80px",
      isDate: true,
      editable: true,
      inputNode: <DatePicker allowClear format={"DD/MM/YY"} />,
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      width: "60px",
      editable: true,
      required: true,
      inputNode: <Select options={paymentStatuses} />,
    },
    {
      title: "Paid on:",
      dataIndex: "paid_at",
      width: "80px",
      isDate: true,
      editable: true,
      inputNode: <DatePicker allowClear format={"DD/MM/YY"} />,
    },
    {
      width: "30px",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div>
            <div>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
            </div>
            <div>
              <a onClick={cancel} style={{ color: "gray" }}>
                Cancel
              </a>
            </div>
          </div>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
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
        isDate: col.isDate,
        inputNode: col.inputNode,
        dataIndex: col.dataIndex,
        required: col.required ?? false,
        title: col.title ?? "",
        editing: isEditing(record),
      }),
    };
  });
  const EditableCell = ({
    editing,
    dataIndex,
    required,
    title,
    isDate,
    inputNode,
    record,
    index,
    children,
    ...restProps
  }) => {
    // TODO: This is a temporary fix to show dates. Properly fix it later
    // start patch
    if (isDate) {
      children = [
        undefined,
        record[dataIndex] ? new Date(record[dataIndex]).toDateString() : "--",
      ];
    } // end patch

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={
              required
                ? [
                    {
                      required: true,
                      message: `required!`,
                    },
                  ]
                : []
            }
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return (
    <>
      <VendorDrawerForm
        open={addVendorOpen}
        onClose={async () => {
          setAddVendorOpen(false);
          setLoading(true);
          let response = await MasterService.getVendors();
          setLoading(false);
          console.log(response);
        }}
      />
      <Row gutter={16} align="middle" style={{ padding: "12px" }}>
        <Col flex={"auto"}>
          <Statistic title="Total Amount" prefix="₹" value={"--"} />
        </Col>
        <Col flex={"auto"}>
          <Statistic title="Paid to Vendor" prefix="₹" value={"--"} />
        </Col>
        <Col flex={"auto"}>
          <Statistic title="Pending Amount" prefix="₹" value={"--"} />
        </Col>
        {/* <Col>
          <AllSettledUp />
        </Col> */}
      </Row>
      <Row gutter={6}>
        <Col
          span={24}
          style={{ overflow: "auto", width: "100%", padding: "0 16px" }}
        >
          {/* <Form form={form} component={false}>
            <Table
              loading={loading}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              size="small"
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
              footer={() => {
                return (
                  <Row>
                    <Col flex={"auto"}>
                      <Button
                        onClick={() => {
                          setAddVendorOpen(true);
                        }}
                      >
                        Add Vendor
                      </Button>
                    </Col>
                    <Space>
                      <Button>Schedule Payment</Button>
                      <Button type="primary" icon={<PlusOutlined />}>
                        Paid Entry
                      </Button>
                    </Space>
                  </Row>
                );
              }}
            />
          </Form> */}
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
          />
        </Col>
      </Row>
    </>
  );
};

export default Vendor;
