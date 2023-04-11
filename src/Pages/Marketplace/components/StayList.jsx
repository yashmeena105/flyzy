import { Empty, message, Space, Spin, Typography } from "antd";
import StayRow from "Pages/Master/StayRow";
import React, { useEffect, useState } from "react";
import MasterService from "services/MasterService";

const { Text, Title } = Typography;
const StayList = ({ searchText, onImport }) => {
  const [loading, setLoading] = useState(false);
  const [stays, setStays] = useState([]);

  const refresh = async () => {
    console.log("staylist", searchText);
    setLoading(true);
    let resp = await MasterService.getStays({ source: "MARKETPLACE" });
    console.log("stays", resp);
    if (resp.success) {
      setStays(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, [searchText]);

  const stayRows = stays.map((l, i) => {
    return (
      <StayRow
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
      {stays.length ? (
        <Space
          size={"small"}
          direction="vertical"
          style={{
            width: "100%",
            padding: "6px 24px",
          }}
        >
          {stayRows}
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

export default StayList;
