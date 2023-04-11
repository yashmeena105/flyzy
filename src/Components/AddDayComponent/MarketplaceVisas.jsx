import {
  Space,
  Layout,
  Row,
  Col,
  Button,
  message,
  Typography,
  Spin,
  Empty,
  Input,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import VisaDrawerForm from "Forms/VisaDrawerForm";
import React, { useEffect, useRef, useState } from "react";
import useKeyboardShortcut from "use-keyboard-shortcut";
import MasterService from "services/MasterService";
import VisaRow from "Pages/Master/VisaRow";

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const MarketplaceVisas = ({ importable = false, onImport }) => {
  useKeyboardShortcut(
    ["Shift", "k"],
    (shortcutKeys) => {
      searchInputRef.current.focus({
        cursor: "all",
      });
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );
  useKeyboardShortcut(
    ["Shift", "n"],
    (shortcutKeys) => {
      setAddVisaDrawerOpen(true);
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );

  const searchInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [addVisaDrawerOpen, setAddVisaDrawerOpen] = useState(false);

  const [visas, setVisas] = useState([]);

  const refresh = async () => {
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
  }, []);

  const visaRows = visas.map((l, i) => {
    return (
      <VisaRow
        data={l}
        key={i}
        importable={importable}
        onImport={onImport}
        location="ITINERARY"
      />
    );
  });

  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
      <VisaDrawerForm
        open={addVisaDrawerOpen}
        onClose={async () => {
          setAddVisaDrawerOpen(false);
          refresh();
        }}
      />
      <Row
        gutter={[12, 6]}
        style={{
          padding: "12px",
          position: "sticky",
          top: "0px",
          backgroundColor: "white",
          zIndex: 2,
        }}
        align={"middle"}
      >
        <Col>
          <Input
            ref={searchInputRef}
            prefix={<SearchOutlined />}
            suffix={
              <Tag
                style={{
                  color: "#ccc",
                  backgroundColor: "#fdfdfd",
                  border: "1px solid #ccc",
                }}
              >
                Shift+K
              </Tag>
            }
            allowClear
            bordered={false}
            placeholder="Search"
          />
        </Col>
        <Col flex={"auto"}></Col>
        <Col>
          <Button
            type="primary"
            style={{ paddingRight: "6px" }}
            size="middle"
            onClick={() => {
              setAddVisaDrawerOpen(true);
            }}
          >
            New Visa
            <span>
              <Tag
                style={{
                  marginLeft: "6px",
                  color: "white",
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
              >
                Shift+N
              </Tag>
            </span>
          </Button>
        </Col>
      </Row>

      <Spin tip="Loading" spinning={loading}>
        {visas.length ? (
          <Space
            size={"small"}
            direction="vertical"
            style={{
              width: "100%",
              padding: "6px 12px",
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
    </Layout>
  );
};

export default MarketplaceVisas;
