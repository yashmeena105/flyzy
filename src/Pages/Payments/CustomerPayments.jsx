import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Typography,
  message,
  Badge,
  Dropdown,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import LeadService from "services/LeadService";
import {
  SaveOutlined,
  MoreOutlined,
  InboxOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  CloudDownloadOutlined,
  CopyOutlined,
  UserDeleteOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { getColorByStatus, paymentStatuses } from "utils/constants";
import CapLabel from "Components/v2/CapLabel";

const CustomerPayments = ({ minimal = false }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(true);
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getLeads();
    if (resp.success) {
      let leads = resp.data;
      let payments = [];
      leads.forEach((l, i) => {
        let cp = l?.customer_payments?.length > 0 ? l.customer_payments : [];
        cp.forEach((p, j) => {
          payments.push(p);
        });
      });
      setData(payments);
      console.log("payments", payments);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  let columns = [
    {
      title: <CapLabel>Customer</CapLabel>,
      width: 180,
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: <CapLabel>Bill No.</CapLabel>,
      width: 60,
      dataIndex: "lead_id",
      key: "lead_id",
    },
    {
      title: <CapLabel>Status</CapLabel>,
      dataIndex: "lead_status",
      key: "lead_status",
      width: 100,
      render: (status, row) => (
        <div
          style={{
            borderLeft: "3px solid #1677ff",
            height: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Select
            size="small"
            bordered={false}
            defaultValue="PAID"
            options={paymentStatuses}
          ></Select>
        </div>
      ),
    },
    {
      title: <CapLabel>Payments</CapLabel>,
      width: 120,
      dataIndex: "payment_received",
      key: "payment_received",
      render: (p, row) => (
        <div>
          ₹ {p} / {row.payment_total}
        </div>
      ),
    },
    {
      title: <CapLabel>Destinations</CapLabel>,
      width: 120,
      dataIndex: "destinations",
      key: "destinations",
    },
    {
      title: <CapLabel>Dates</CapLabel>,
      width: 120,
      dataIndex: "travel_dates",
      key: "travel_dates",
    },
    {
      title: <CapLabel>SETTINGS</CapLabel>,
      key: "operation",
      fixed: "right",
      width: 60,
      render: () => (
        <Dropdown
          trigger={["click"]}
          placement="bottom"
          menu={{
            items: [
              {
                label: "Copy User Id",
                key: "COPY_UID",
                icon: <CopyOutlined />,
              },
              {
                label: "Remove",
                key: "REMOVE",
                icon: <UserDeleteOutlined />,
                danger: true,
              },
            ],
          }}
          arrow={false}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  if (minimal) {
    columns.pop();
  }
  const dt = [];
  for (let i = 0; i < 3; ++i) {
    dt.push({
      key: i.toString(),
      customer_name: "Balmar Lawrie Private Limited",
      lead_id: "1091",
      destinations: "Dubai, Abu Dhabi",
      travel_dates: "23 Apr - 27 Apr",
      lead_status: "CONFIRMED",
      payment_total: 132000,
      payment_received: 52000,
    });
  }
  return (
    <Table
      columns={columns}
      dataSource={dt}
      scroll={{
        x: 1200,
        y: 500,
      }}
      pagination={false}
      bordered
    />
  );
};

export default CustomerPayments;
