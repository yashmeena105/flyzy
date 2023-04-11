import React, { useEffect, useState } from "react";
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
  Popconfirm,
  InputNumber,
  Input,
  message,
  DatePicker,
  Select,
} from "antd";
import { Card } from "antd";
import AllSettledUp from "Components/AllSettledUp";
import LeadService from "services/LeadService";
import { useParams } from "react-router-dom";
import { paymentModes, paymentStatuses } from "utils/constants";
import { leadData } from "../data";
import ItineraryService from "services/ItineraryService";
import dayjs from "dayjs";
const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;

const { Paragraph } = Typography;
const { Text, Link, Title } = Typography;

const Customer = () => {
  const { id } = useParams();
  const leadId = id;

  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [itineraryData, setItineraryData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [received, setReceived] = useState(null);
  const [paid, setPaid] = useState(null);
  const isEditing = (record) => record.key === editingKey;

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getLead(leadId);
    console.log("lead Data", resp.data);
    if (resp.success) {
      setData(resp.data?.customer_payments);
      setReceived(
        (resp.data?.customer_payments ?? []).reduce(function (count, item) {
          return count + (item.status == "PAID" ? item.amount : 0);
        }, 0)
      );
    } else {
      message.error(resp.error);
    }
    resp = await ItineraryService.getConfirmedItinerary(leadId);
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

  const edit = (record) => {
    console.log("editing", record);
    form.setFieldsValue({
      mode: "",
      amount: "",
      status: "",
      // due_date: null,
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
        console.log("new Data", newData);
        update(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        update(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Payment Mode",
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
    // {
    //   title: "Due Date",
    //   dataIndex: "due_date",
    //   width: "80px",
    //   isDate: true,
    //   editable: true,
    //   inputNode: <DatePicker allowClear format={"DD/MM/YY"} />,
    // },
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
      inputNode: <Input />,
    },
    {
      width: "70px",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Row gutter={[8, 6]}>
            <Col>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
            </Col>
            <Col>
              <a onClick={cancel} style={{ color: "gray" }}>
                Cancel
              </a>
            </Col>
          </Row>
        ) : (
          <Row gutter={[12, 6]}>
            <Col>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            </Col>
            <Col>
              <Typography.Link
                type="danger"
                disabled={editingKey !== ""}
                onClick={() => handleDelete(record.key)}
              >
                Delete
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
        record[dataIndex]
          ? dayjs(record[dataIndex]).format("DD-MMM-YYYY")
          : "--",
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
  const handleAdd = (status) => {
    const rand = Math.random() * 10;
    const newData = {
      key: rand,
      mode: "",
      amount: "",
      // due_date: null,
      status: status,
      paid_at: dayjs().format("DD-MMM-YYYY").toString(),
    };
    setData([...data, newData]);
    console.log(data);
    setEditingKey(rand);
  };

  const update = async (data) => {
    setLoading(true);
    let resp = await LeadService.updateLead({
      payload: { lead_id: leadId, customer_payments: data },
    });
    if (resp.success) {
      refresh();
    } else {
      message.error(resp?.error ?? "Something went wrong");
      refresh();
    }
    setLoading(false);
  };
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    console.log("newData", newData);
    update(newData);
  };

  return (
    <>
      <Row gutter={16} align="middle" style={{ padding: "12px" }}>
        <Col flex={"auto"}>
          <Statistic
            title="Invoice Total"
            prefix="₹"
            value={itineraryData?.info?.price}
          />
        </Col>
        <Col flex={"auto"}>
          <Statistic title="Received" prefix="₹" value={received} />
        </Col>
        <Col flex={"auto"}>
          <Statistic
            title="Pending Amount"
            prefix="₹"
            value={(itineraryData?.info?.price ?? 0) - received}
          />
        </Col>
        {/* <Col>
          <AllSettledUp />
        </Col> */}
      </Row>
      <Row gutter={6}>
        <Col span={24} style={{ overflow: "auto", padding: "0 16px" }}>
          <Form form={form} component={false}>
            <Table
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
                      <Text>{}</Text>
                    </Col>
                    <Space>
                      {/* <Col flex={"100px"}>
                        <Button onClick={() => handleAdd("SCHEDULE")}>
                          Schedule a Payment
                        </Button>
                      </Col> */}
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => handleAdd("PAID")}
                        >
                          Add New Paid Entry
                        </Button>
                      </Col>
                    </Space>
                  </Row>
                );
              }}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Customer;
