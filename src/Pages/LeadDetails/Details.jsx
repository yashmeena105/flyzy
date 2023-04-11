import React, { useEffect, useState } from "react";
import {
  Badge,
  Collapse,
  Descriptions,
  Divider,
  Radio,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Table,
  List,
  Tooltip,
  message,
} from "antd";
import PaxCount from "Components/PaxCount";
import DestinationTag from "Components/DestinationTag";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CalendarOutlined,
  PhoneOutlined,
  DeleteOutlined,
  MailOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import DateTag from "Components/DateTag";
import {
  getInitials,
  getRandomColor,
  summarizeDestinations,
  getDateRangeStr,
} from "utils/stringFunctions";
import { notesData, tasksData } from "./data";
import RequirementTag from "Components/RequirementsTag";
import LeadService from "services/LeadService";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Section from "Components/v2/Section";
import Link from "Components/v2/Link";
import LeadDrawerForm from "Forms/LeadDrawerForm";
import Statuses from "Components/v2/Statuses";
import { leadStatuses } from "utils/constants";
const { Meta } = Card;
const { Panel } = Collapse;

const { Paragraph } = Typography;
const { Text, Title } = Typography;

const Details = ({ parentHeight, parentRefresh }) => {
  let { id, key } = useParams();

  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState({});
  const [leadDrawerOpen, setLeadDrawerOpen] = useState(false);

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getLead(id);
    if (resp.success) {
      console.log("Lead Data", resp.data);
      resp.data.travel_dates = (resp.data.travel_dates ?? []).map((d) =>
        dayjs(d)
      );
      setLeadData(resp.data);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("useEffect of leadDetails");
    refresh();
  }, []);

  return (
    <div
      style={{
        height: parentHeight,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      }}
    >
      <LeadDrawerForm
        isEditing
        leadId={id}
        open={leadDrawerOpen}
        onClose={() => {
          setLeadDrawerOpen(false);
          refresh();
        }}
      />
      <Section>
        <Link
          onClick={() => {
            setLeadDrawerOpen(true);
          }}
        >
          <Space style={{ fontWeight: "bold", fontSize: "20px" }}>
            Lead Details
            <span>
              <EditOutlined />
            </span>
          </Space>
        </Link>
      </Section>
      <Section>
        <Card
          title={
            <Row justify="space-between" align="top">
              <Space style={{ padding: "10px 0" }}>
                <Avatar src={leadData?.customer_id?.logo?.url} size={48}>
                  {getInitials(leadData?.customer_name)}
                </Avatar>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: "18px" }}>
                    {leadData?.customer_name}
                  </Text>
                  <span style={{ color: "gray" }}>
                    <Link type="secondary">
                      <MailOutlined /> {leadData?.email}
                    </Link>
                    {" • "}
                    <Link type="secondary">
                      <PhoneOutlined /> {leadData?.phone_number}
                    </Link>
                  </span>
                </div>
              </Space>
              <Space style={{ padding: "20px 0 0 0" }}>
                <Button shape="circle" icon={<PlusOutlined />} />
                <Button shape="circle" icon={<PhoneOutlined />} />
                <Button shape="circle" icon={<MailOutlined />} />
                <Button shape="circle" icon={<MoreOutlined />} />
              </Space>
            </Row>
          }
        >
          <Descriptions layout="vertical" size="small">
            <Descriptions.Item label="Assignee">
              Hansraj Patel
            </Descriptions.Item>
            <Descriptions.Item label="Destinations">
              Dubai, United Arab Emirates
              <br />
              Abu Dhabi, United Arab Emirates
            </Descriptions.Item>
            <Descriptions.Item label="Travel Dates">
              <Tag icon={<CalendarOutlined />}>24 Apr 2023 - 30 Apr 2023</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Section>
      <Section>
        <Statuses
          options={leadStatuses}
          currentValue={leadData.status}
          lead_id={leadData.lead_id}
          refresh={() => {
            refresh();
            parentRefresh();
          }}
        ></Statuses>
      </Section>
    </div>
  );
};

export default Details;
