import {
  Row,
  Col,
  Space,
  Typography,
  Card,
  Tag,
  Badge,
  Divider,
  Dropdown,
  Button,
  Select,
  Tooltip,
  Avatar,
  Progress,
} from "antd";
import PaxCount from "Components/PaxCount";
import MiniRequirementTags from "Components/RequirementsTag/MiniRequirementTags";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeadService from "services/LeadService";
import {
  getColorByStatus,
  getLeadStatusOptionByValue,
  leadStatuses,
} from "utils/constants";
import {
  getInitials,
  getRandomColor,
  summarizeDestinations,
  getDateRangeStr,
} from "utils/stringFunctions";

const { Text, Title, Paragraph } = Typography;

const LeadRow = ({ data, refresh }) => {
  const navigate = useNavigate();
  const { MemberList } = useSelector((state) => state.AssignMember);

  const getRibbon = () => {
    if (data?.lead_source == "MARKETPLACE")
      return { text: "B2B", color: "gray" };
    return { text: "B2C", color: "gray" };
  };

  const getStartDateStr = () => {
    if (data?.travel_dates?.length > 0) {
      return dayjs(data.travel_dates[0]).format("DD-MMM-YYYY");
    }
  };
  const getEndDateStr = () => {
    if (data?.travel_dates?.length > 0) {
      return dayjs(data.travel_dates[1]).format("DD-MMM-YYYY");
    }
  };
  return (
    <Card
      size="small"
      hoverable
      onClick={() => {
        navigate(`/leads/${data.lead_id}/details`);
      }}
      style={{
        borderLeft: `3px solid ${
          getColorByStatus(data.status).backgroundActive
        }`,
      }}
    >
      <Row gutter={[18, 6]}>
        <Col span={6} style={{}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Text
                style={{ fontWeight: "bold", fontSize: "16px" }}
                ellipsis={{
                  rows: 1,
                  expandable: false,
                  tooltip: data.customer_name,
                }}
              >
                {data.customer_name}
              </Text>
            </div>
            <div
              style={{
                color: getRibbon()?.color,
                fontSize: "16px",
              }}
            >
              {getRibbon()?.text}
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div
            style={{
              border: `1px solid ${
                getColorByStatus(data.status).backgroundActive
              }`,
              borderLeft: `3px solid ${
                getColorByStatus(data.status).backgroundActive
              }`,
              width: "min-content",
            }}
          >
            <Select
              size="small"
              bordered={false}
              onClick={(e) => {
                e.stopPropagation();
              }}
              options={leadStatuses}
              defaultValue={getLeadStatusOptionByValue(data.status)}
              onChange={async (val) => {
                console.log(data);
                await LeadService.updateLead({
                  payload: {
                    lead_id: data.lead_id,
                    status: val,
                  },
                });
                refresh();
              }}
            ></Select>
          </div>
        </Col>
        <Col span={4}>
          <div>
            <Text style={{ fontSize: "16px" }}>{getStartDateStr()}</Text>
          </div>
          <div>
            <Text
              type="secondary"
              style={{
                fontSize: "12px",
              }}
            >
              {`Till ${getEndDateStr()} (${data.no_of_days}N)`}
            </Text>
          </div>
        </Col>
        <Divider type="vertical" />
        <Col span={4}>
          <div>
            <Text
              style={{ fontSize: "16px" }}
              ellipsis={{
                rows: 1,
                expandable: false,
                tooltip: summarizeDestinations(data.destinations),
              }}
            >
              {summarizeDestinations(data.destinations)}
            </Text>
          </div>
        </Col>
        <Divider type="vertical" />

        <Col>
          {/* <Text
            type="secondary"
            style={{
              fontSize: "12px",
            }}
          >
            Assigned To:
          </Text>
          <Select
            defaultValue={data?.assignee}
            onClick={(e) => {
              e.stopPropagation();
            }}
            bordered={false}
            options={MemberList?.data?.map((a) => ({
              label: (
                <Tooltip
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
                      backgroundColor: getRandomColor(),
                    }}
                    size="small"
                  >
                    {getInitials(a.name)}
                  </Avatar>
                </Tooltip>
              ),
              value: JSON.stringify(a),
            }))}
          /> */}
          <PaxCount
            adults={data.pax.adult ?? 0}
            children={data.pax.child ?? 0}
            infants={data.pax.infant ?? 0}
          />
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col>
          <Text
            type="secondary"
            style={{
              fontSize: "12px",
            }}
          >
            #{data.lead_id} | Created At:{" "}
            {dayjs(data.created_utc_timestamp).format("D-MMM-YY H:mm a")}
          </Text>
        </Col>
        <Col>
          <MiniRequirementTags requirementsList={data.requirements} />
        </Col>
      </Row>
    </Card>
  );
};

export default LeadRow;
