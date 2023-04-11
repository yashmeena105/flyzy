import { Empty, message, Space, Spin, Typography } from "antd";
import VisaRow from "Pages/Master/VisaRow";
import React, { useEffect, useState } from "react";
import MasterService from "services/MasterService";

const { Text, Title } = Typography;
const VisaList = ({ searchText, onImport }) => {
  const [loading, setLoading] = useState(false);
  const [visas, setVisas] = useState([]);

  const refresh = async () => {
    console.log("visalist", searchText);
    setLoading(true);
    let resp = await MasterService.getAllVisa({ source: "MARKETPLACE" });
    console.log("visas", resp);
    if (resp.success) {
      setVisas(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, [searchText]);

  const visaRows = visas.map((l, i) => {
    return (
      <VisaRow
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
      {visas.length ? (
        <Space
          size={"small"}
          direction="vertical"
          style={{
            width: "100%",
            padding: "6px 24px",
          }}
        >
          {visaRows}
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

export default VisaList;
