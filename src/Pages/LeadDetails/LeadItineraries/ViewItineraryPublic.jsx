import {
  Divider,
  Row,
  Space,
  Tag,
  Timeline,
  Watermark,
  Typography,
  message,
  Spin,
  Result,
  Col,
} from "antd";
import PreviewProposal from "Components/PreviewProposal/PreviewProposal";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItineraryService from "services/ItineraryService";

const { Text } = Typography;

const ViewItineraryPublic = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [proposalData, setProposalData] = useState(null);

  const refresh = async () => {
    setLoading(true);
    let resp = await ItineraryService.getProposal({ _id });
    if (resp.success) {
      setProposalData(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{ height: "100vh", overflowY: "auto", width: "100%" }}>
      <Row justify="center" style={{ padding: "20px" }}>
        <Col>
          <Spin spinning={loading}>
            {proposalData == null ? (
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
              />
            ) : (
              <PreviewProposal data={proposalData} />
            )}
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default ViewItineraryPublic;
