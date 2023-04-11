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
import StayDrawerForm from "Forms/StayDrawerForm";
import React, { useEffect, useRef, useState } from "react";
import StayRow from "./StayRow";
import useKeyboardShortcut from "use-keyboard-shortcut";
import MasterService from "services/MasterService";

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const AllStays = ({ importable = false, onImport, location }) => {
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
      setAddStayDrawerOpen(true);
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );

  const searchInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [addStayDrawerOpen, setAddStayDrawerOpen] = useState(false);

  const [stays, setStays] = useState([]);

  const refresh = async () => {
    setLoading(true);
    let resp = await MasterService.getStays({ source: "MASTER" });
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
  }, []);

  const stayRows = stays.map((l, i) => {
    return (
      <StayRow
        data={l}
        key={i}
        importable={importable}
        onImport={onImport}
        location={location}
      />
    );
  });

  return (
    <Layout style={{ height: "100vh", overflowY: "auto" }}>
      <StayDrawerForm
        open={addStayDrawerOpen}
        onClose={async () => {
          setAddStayDrawerOpen(false);
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
              setAddStayDrawerOpen(true);
            }}
          >
            New Stay
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
        {stays.length ? (
          <Space
            size={"small"}
            direction="vertical"
            style={{
              width: "100%",
              padding: "6px 12px",
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
    </Layout>
  );
};

export default AllStays;
