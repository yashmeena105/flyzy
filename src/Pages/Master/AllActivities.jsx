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
import ActivityDrawerForm from "Forms/ActivityDrawerForm";
import React, { useEffect, useRef, useState } from "react";
import ActivityRow from "./ActivityRow";
import useKeyboardShortcut from "use-keyboard-shortcut";
import MasterService from "services/MasterService";

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const AllActivities = ({ importable = false, onImport, location }) => {
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
      setAddActivityDrawerOpen(true);
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );

  const searchInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [addActivityDrawerOpen, setAddActivityDrawerOpen] = useState(false);

  const [activities, setActivities] = useState([]);

  const refresh = async () => {
    setLoading(true);
    let resp = await MasterService.getActivities({ source: "MASTER" });
    console.log("activities", resp);
    if (resp.success) {
      setActivities(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const activityRows = activities.map((l, i) => {
    return (
      <ActivityRow
        data={l}
        key={i}
        importable={importable}
        onImport={onImport}
        location={location}
      />
    );
  });

  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
      <ActivityDrawerForm
        open={addActivityDrawerOpen}
        onClose={async () => {
          setAddActivityDrawerOpen(false);
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
              setAddActivityDrawerOpen(true);
            }}
          >
            New Activity
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
        {activities.length ? (
          <Space
            size={"small"}
            direction="vertical"
            style={{
              width: "100%",
              padding: "6px 12px",
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
    </Layout>
  );
};

export default AllActivities;
