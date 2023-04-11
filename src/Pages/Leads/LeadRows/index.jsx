import AppUsageIcon from "Components/AppUsageIcon";
import DateTag from "Components/DateTag";
import DestinationTag from "Components/DestinationTag";
import PaxCount from "Components/PaxCount";
import { Col, Row, Tag } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectAssignee from "../SelectAssignee";
import "./styles.scss";
import RequirementTag from "Components/RequirementsTag";
const LeadRows = ({ leadList }) => {
  const navigate = useNavigate();

  const { MemberList } = useSelector((state) => state.AssignMember);

  console.log("MemberList", MemberList);

  return (
    <>
      {leadList?.data?.map((lead, index) => {
        return (
          <>
            <div className="lead-row" key={index}>
              <div
                className="flex-1 id"
                onClick={() => {
                  navigate(`/lead/${lead.lead_id}/details`);
                }}
              >
                #{lead?.lead_id}
              </div>
              <div className="flex-1 col">
                {lead?.status === "New Lead" ? (
                  <Tag color="lightBlue">New Lead</Tag>
                ) : (
                  <Tag color="lightRed">High Priority</Tag>
                )}
              </div>
              <div className="flex-2">{lead?.customer_name}</div>
              <div className="flex-1 wrap">
                {lead?.requirements?.map((req) => (
                  <Row gutter={[6, 6]}>
                    {
                      <Col>
                        <RequirementTag
                          requirement={req?.requirement ?? "--"}
                        />
                      </Col>
                    }
                  </Row>
                ))}
              </div>

              <div className="flex-3">
                <div className="col">
                  <div className="dates">
                    <DateTag text="24 Sep - 2 Oct 22" />
                  </div>
                  <div className="pax">
                    <PaxCount
                      adults={lead?.pax?.adult}
                      children={lead?.pax?.child}
                      infants={lead?.pax?.infant}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <SelectAssignee
                  options={MemberList?.data}
                  defaultValue={lead?.assignee}
                  leadId={lead?.lead_id}
                />
              </div>
              <div className="flex-0 phone">
                <AppUsageIcon active={lead?.on_app ?? false} />
              </div>

              <div className="flex-2 col">
                {lead?.destinations.map((des) => (
                  <DestinationTag text={des?.formatted_address} />
                ))}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default LeadRows;
