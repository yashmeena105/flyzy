import { Empty, message, Space, Spin, Typography } from "antd";
import ActivityRow from "Pages/Master/ActivityRow";
import React, { useEffect, useState } from "react";
import MasterService from "services/MasterService";

const { Text, Title } = Typography;
const ActivityList = ({ searchText, onImport }) => {
  const [loading, setLoading] = useState(false);
  const [activitys, setActivitys] = useState([]);

  const refresh = async () => {
    console.log("activitylist", searchText);
    setLoading(true);
    let resp = await MasterService.getActivities({ source: "MARKETPLACE" });
    console.log("activitys", resp);
    if (resp.success) {
      setActivitys(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, [searchText]);

  const activityRows = activitys.map((l, i) => {
    return (
      <ActivityRow
        data={l}
        key={i}
        importable
        onImport={onImport}
        location="MARKETPLACE"
      />
    );
  });

  return (
    <Spin tip="Loading" spinning={loading}>
      {activitys.length ? (
        <Space
          size={"small"}
          direction="vertical"
          style={{
            width: "100%",
            padding: "6px 24px",
          }}
        >
          {activityRows}
        </Space>
      ) : !loading ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={
            <Space direction="vertical">
              <Text>No data</Text>
              <div>
                <span>
                  Something wrong?
                  <br />
                  <a target={"_blank"} href="/contact">
                    Let us know
                  </a>
                  . We really appreciate it.
                </span>
              </div>
            </Space>
          }
        ></Empty>
      ) : (
        <></>
      )}
    </Spin>
  );
};

export default ActivityList;
