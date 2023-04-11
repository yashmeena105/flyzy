import { Empty, message, Space, Spin, Typography } from "antd";
import TransportRow from "Pages/Master/TransportRow";
import React, { useEffect, useState } from "react";
import MasterService from "services/MasterService";

const { Text, Title } = Typography;
const TransportList = ({ searchText, onImport }) => {
  const [loading, setLoading] = useState(false);
  const [transports, setTransports] = useState([]);

  const refresh = async () => {
    console.log("transportlist", searchText);
    setLoading(true);
    let resp = await MasterService.getTransports({ source: "MARKETPLACE" });
    console.log("transports", resp);
    if (resp.success) {
      setTransports(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, [searchText]);

  const transportRows = transports.map((l, i) => {
    return (
      <TransportRow
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
      {transports.length ? (
        <Space
          size={"small"}
          direction="vertical"
          style={{
            width: "100%",
            padding: "6px 24px",
          }}
        >
          {transportRows}
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

export default TransportList;
